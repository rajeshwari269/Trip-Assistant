import React, { useEffect, useState } from "react";

interface WeatherCardProps {
  city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const [weather, setWeather] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

 const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


  useEffect(() => {
    setLoading(true);
    const cleanCity = city.split(",")[0].trim();
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&appid=${API_KEY}&units=metric`
)

      .then((res) => res.json())
      .then((data) => {
        if (data.main) {
          setWeather(`${data.main.temp}°C, ${data.weather[0].main}`);
        } else {
          setWeather("N/A");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setWeather("N/A");
        setLoading(false);
      });
  }, [city]);

  return (
    <p className="weather-text">
      🌤️ {loading ? "Loading weather..." : weather}
    </p>
  );
};

export default WeatherCard;
