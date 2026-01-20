import WeatherIcon from "./WeatherIcon";
import { MapPin, Calendar } from "lucide-react";

interface CurrentWeatherProps {
  city: string;
  country: string;
  date: string;
  temperature: number;
  weatherCode: number;
  description: string;
}

const CurrentWeather = ({
  city,
  country,
  date,
  temperature,
  weatherCode,
  description,
}: CurrentWeatherProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {/* Location */}
      <div className="flex items-center gap-2 text-weather-secondary opacity-0 animate-fade-in-up">
        <MapPin className="w-5 h-5 text-accent" />
        <span className="text-xl font-medium">
          {city}, {country}
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-weather-muted opacity-0 animate-fade-in-up animate-delay-100">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">{date}</span>
      </div>

      {/* Temperature & Icon */}
      <div className="flex items-center justify-center gap-6 my-4 opacity-0 animate-fade-in-up animate-delay-200">
        <WeatherIcon weatherCode={weatherCode} className="w-28 h-28" />
        <div className="flex flex-col items-start">
          <span className="text-8xl font-light text-gradient tracking-tight">
            {temperature}°
          </span>
          <span className="text-weather-secondary text-lg mt-1">Celsius</span>
        </div>
      </div>

      {/* Description */}
      <div className="opacity-0 animate-fade-in-up animate-delay-300">
        <span className="text-2xl font-medium text-weather-primary">
          {description}
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
