import { Droplets, Wind, Thermometer } from "lucide-react";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

const WeatherDetails = ({ humidity, windSpeed, feelsLike }: WeatherDetailsProps) => {
  const details = [
    {
      icon: Droplets,
      label: "Humidity",
      value: `${humidity}%`,
      color: "text-blue-400",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${windSpeed} km/h`,
      color: "text-cyan-400",
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${feelsLike}°C`,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {details.map((detail, index) => (
        <div
          key={detail.label}
          className={`detail-card p-5 flex flex-col items-center gap-3 opacity-0 animate-fade-in-up`}
          style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
        >
          <detail.icon className={`w-7 h-7 ${detail.color}`} />
          <span className="text-weather-muted text-sm font-medium">{detail.label}</span>
          <span className="text-weather-primary text-xl font-semibold">{detail.value}</span>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
