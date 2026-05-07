"use client";

import { useState } from "react";

type Weather = {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
};

export default function WeatherPanel() {
  const [location, setLocation] = useState("Dublin");
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather() {
    if (!location.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          location
        )}&count=1&language=en&format=json`
      );

      const geoData = await geoRes.json();
      const result = geoData.results?.[0];

      if (!result) {
        setPlace("Location not found");
        return;
      }

      setPlace(`${result.name}, ${result.country}`);

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code`
      );

      const weatherData = await weatherRes.json();
      setWeather(weatherData.current);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-fit rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-white">Today&apos;s Weather</h2>
      <p className="mt-2 text-sm text-gray-400">
        Choose a city to view current weather conditions.
      </p>

      <div className="mt-5 flex items-center gap-3">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          placeholder="e.g. Dublin, London, Shanghai"
          className="w-56 rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
        />
        <button
          onClick={fetchWeather}
          className="rounded-xl bg-white px-5 py-3 font-medium text-black hover:bg-gray-200"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-5 text-gray-400">Loading weather...</p>}

      {place && !loading && (
        <p className="mt-5 text-sm text-gray-300">{place}</p>
      )}

      {weather && !loading && (
            <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-black/40 p-4">
            <p className="text-sm text-gray-400">Temperature</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {weather.temperature_2m}°C
            </p>
          </div>

          <div className="rounded-xl bg-black/40 p-4">
            <p className="text-sm text-gray-400">Feels Like</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {weather.apparent_temperature}°C
            </p>
          </div>

          <div className="rounded-xl bg-black/40 p-4">
            <p className="text-sm text-gray-400">Humidity</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {weather.relative_humidity_2m}%
            </p>
          </div>

          <div className="rounded-xl bg-black/40 p-4">
            <p className="text-sm text-gray-400">Wind</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {weather.wind_speed_10m} km/h
            </p>
          </div>
        </div>
      )}
    </section>
  );
}