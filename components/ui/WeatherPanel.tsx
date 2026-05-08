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
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);

  async function fetchWeather(city?: string) {
    const targetCity = city || location;

    if (!targetCity.trim()) return;

    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          targetCity
        )}&count=1&language=en&format=json`
      );

      const geoData = await geoRes.json();
      const result = geoData.results?.[0];

      if (!result) {
        setPlace("Location not found");
        setWeather(null);
        return;
      }

      setLocation(result.name);
      setPlace(`${result.name}, ${result.country}`);

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code`
      );

      const weatherData = await weatherRes.json();

      setWeather(weatherData.current);

      const adviceRes = await fetch("/api/weather-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: result.name,
          temperature: weatherData.current.temperature_2m,
          feelsLike: weatherData.current.apparent_temperature,
          humidity: weatherData.current.relative_humidity_2m,
          wind: weatherData.current.wind_speed_10m,
        }),
      });

      const adviceData = await adviceRes.json();
      setAdvice(adviceData.advice);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md md:p-8">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Today&apos;s Weather
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400">
            Search weather by city.
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30 text-lg text-zinc-300 transition hover:bg-white/10"
        >
          {expanded ? "−" : "+"}
        </button>
      </div>

      {expanded && (
        <>
          {/* SEARCH */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
              placeholder="e.g. Dublin"
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-white/30"
            />

            <button
              onClick={() => fetchWeather()}
              className="rounded-xl bg-white px-8 py-3 font-medium text-black transition hover:bg-gray-200 sm:w-[140px]"
            >
              Search
            </button>
          </div>

          {/* QUICK CITY TAGS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["Dublin", "London", "Beijing"].map((city) => (
              <button
                key={city}
                onClick={() => fetchWeather(city)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white"
              >
                {city}
              </button>
            ))}
          </div>

          {loading && (
            <p className="mt-5 text-sm text-gray-400">
              Loading weather...
            </p>
          )}

          {place && !loading && (
            <p className="mt-5 text-sm text-gray-300">{place}</p>
          )}

          {weather && !loading && (
            <>
              <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  AI Weather Note
                </p>

                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {advice}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            </>
          )}
        </>
      )}
    </section>
  );
}