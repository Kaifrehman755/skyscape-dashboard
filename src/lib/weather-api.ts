// Weather API using Open-Meteo (free, no API key required)

interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

interface WeatherData {
  current_weather: CurrentWeather;
  hourly: {
    time: string[];
    relativehumidity_2m: number[];
    apparent_temperature: number[];
  };
}

export interface ProcessedWeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  date: string;
}

// WMO Weather interpretation codes
const weatherCodeDescriptions: Record<number, string> = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing Rime Fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Drizzle",
  56: "Light Freezing Drizzle",
  57: "Dense Freezing Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  66: "Light Freezing Rain",
  67: "Heavy Freezing Rain",
  71: "Slight Snow Fall",
  73: "Moderate Snow Fall",
  75: "Heavy Snow Fall",
  77: "Snow Grains",
  80: "Slight Rain Showers",
  81: "Moderate Rain Showers",
  82: "Violent Rain Showers",
  85: "Slight Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm with Slight Hail",
  99: "Thunderstorm with Heavy Hail",
};

export const getWeatherDescription = (code: number): string => {
  return weatherCodeDescriptions[code] || "Unknown";
};

export async function searchCity(query: string): Promise<GeocodingResult | null> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) throw new Error("Failed to fetch city data");
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return null;
    }
    
    return data.results[0];
  } catch (error) {
    console.error("Error searching city:", error);
    throw error;
  }
}

export async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature&timezone=auto`
    );
    
    if (!response.ok) throw new Error("Failed to fetch weather data");
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}

export async function fetchWeatherForCity(cityName: string): Promise<ProcessedWeatherData> {
  const city = await searchCity(cityName);
  
  if (!city) {
    throw new Error("City not found. Please try another location.");
  }
  
  const weather = await getWeatherData(city.latitude, city.longitude);
  
  // Get current hour index for hourly data
  const currentTime = new Date(weather.current_weather.time);
  const currentHourIndex = weather.hourly.time.findIndex(
    (time) => new Date(time).getHours() === currentTime.getHours()
  );
  
  const humidity = weather.hourly.relativehumidity_2m[currentHourIndex] || 0;
  const feelsLike = weather.hourly.apparent_temperature[currentHourIndex] || weather.current_weather.temperature;
  
  return {
    city: city.name,
    country: city.country,
    temperature: Math.round(weather.current_weather.temperature),
    feelsLike: Math.round(feelsLike),
    humidity,
    windSpeed: Math.round(weather.current_weather.windspeed),
    weatherCode: weather.current_weather.weathercode,
    description: getWeatherDescription(weather.current_weather.weathercode),
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
