import { useState } from "react";
import { Globe, CloudOff } from "lucide-react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import { fetchWeatherForCity, ProcessedWeatherData } from "@/lib/weather-api";
import { useToast } from "@/hooks/use-toast";

const WeatherDashboard = () => {
  const [weather, setWeather] = useState<ProcessedWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const data = await fetchWeatherForCity(city);
      setWeather(data);
    } catch (error) {
      toast({
        title: "Location Not Found",
        description: error instanceof Error ? error.message : "Please try another city name.",
        variant: "destructive",
      });
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gradient-background min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Main Glass Card Container */}
      <div className="glass-card w-full max-w-2xl p-8 sm:p-12">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Globe className="w-8 h-8 text-accent animate-spin-slow" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient">
            Global Weather Companion
          </h1>
        </div>

        {/* Search Section */}
        <div className="mb-10">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Weather Display */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            <p className="text-weather-muted">Fetching weather data...</p>
          </div>
        ) : weather ? (
          <div className="space-y-8">
            <CurrentWeather
              city={weather.city}
              country={weather.country}
              date={weather.date}
              temperature={weather.temperature}
              weatherCode={weather.weatherCode}
              description={weather.description}
            />
            
            <div className="border-t border-white/10 pt-8">
              <WeatherDetails
                humidity={weather.humidity}
                windSpeed={weather.windSpeed}
                feelsLike={weather.feelsLike}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            {hasSearched ? (
              <>
                <CloudOff className="w-16 h-16 text-weather-muted" />
                <p className="text-weather-muted text-lg">No weather data found</p>
                <p className="text-weather-muted/60 text-sm">Try searching for another city</p>
              </>
            ) : (
              <>
                <Globe className="w-20 h-20 text-accent/40 animate-pulse" />
                <p className="text-weather-secondary text-lg font-medium">
                  Search for any city worldwide
                </p>
                <p className="text-weather-muted text-sm">
                  Enter a city name above to get started
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-8 text-weather-muted/50 text-sm">
        Powered by Open-Meteo API • Real-time weather data
      </p>
    </div>
  );
};

export default WeatherDashboard;
