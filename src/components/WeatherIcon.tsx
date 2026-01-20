import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog, 
  CloudDrizzle,
  CloudSun,
  Cloudy
} from "lucide-react";

interface WeatherIconProps {
  weatherCode: number;
  className?: string;
}

const WeatherIcon = ({ weatherCode, className = "" }: WeatherIconProps) => {
  const getIcon = () => {
    // Clear
    if (weatherCode === 0) {
      return <Sun className={`${className} text-yellow-400`} />;
    }
    // Mainly clear, partly cloudy
    if (weatherCode >= 1 && weatherCode <= 2) {
      return <CloudSun className={`${className} text-yellow-300`} />;
    }
    // Overcast
    if (weatherCode === 3) {
      return <Cloudy className={`${className} text-gray-300`} />;
    }
    // Fog
    if (weatherCode >= 45 && weatherCode <= 48) {
      return <CloudFog className={`${className} text-gray-400`} />;
    }
    // Drizzle
    if (weatherCode >= 51 && weatherCode <= 57) {
      return <CloudDrizzle className={`${className} text-blue-300`} />;
    }
    // Rain
    if (weatherCode >= 61 && weatherCode <= 67) {
      return <CloudRain className={`${className} text-blue-400`} />;
    }
    // Snow
    if (weatherCode >= 71 && weatherCode <= 77) {
      return <CloudSnow className={`${className} text-blue-200`} />;
    }
    // Rain showers
    if (weatherCode >= 80 && weatherCode <= 82) {
      return <CloudRain className={`${className} text-blue-400`} />;
    }
    // Snow showers
    if (weatherCode >= 85 && weatherCode <= 86) {
      return <CloudSnow className={`${className} text-blue-200`} />;
    }
    // Thunderstorm
    if (weatherCode >= 95 && weatherCode <= 99) {
      return <CloudLightning className={`${className} text-yellow-500`} />;
    }
    // Default
    return <Cloud className={`${className} text-gray-300`} />;
  };

  return (
    <div className="weather-icon-glow animate-float">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
