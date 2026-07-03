/* ==========================================
   API FUNCTIONS
========================================== */
import { CONFIG } from "./config.js";
import { state } from "./state.js";
/* ==========================================
   FETCH WEATHER
========================================== */
export async function fetchWeather(city) {
  try {
    // Cancel previous request
    if (state.controller) {
      state.controller.abort();
    }
    state.controller = new AbortController();
    const url = `${CONFIG.BASE_URL}?q=${encodeURIComponent(city)}&appid=${CONFIG.API_KEY}&units=${CONFIG.DEFAULT_UNIT}`;
    const response = await fetch(url, {
      signal: state.controller.signal,
    });
    if (response.status === 404) {
      throw new Error("City not found");
    }
    if (response.status === 401) {
      throw new Error("Invalid API Key");
    }
    if (!response.ok) {
      throw new Error("Unable to fetch weather");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      return null;
    }
    throw error;
  }
}
/* ==========================================
   CITY SUGGESTIONS
========================================== */
export async function fetchCitySuggestions(query) {
  if (!query.trim()) {
    return [];
  }
  try {
    const url = `${CONFIG.GEO_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${CONFIG.API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch {
    return [];
  }
}
/* ==========================================
   CURRENT LOCATION
========================================== */
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      () => {
        reject(new Error("Location access denied."));
      },
    );
  });
}
/* ==========================================
   FETCH WEATHER USING COORDINATES
========================================== */
export async function fetchWeatherByCoords(latitude, longitude) {
  try {
    const url = `${CONFIG.BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${CONFIG.API_KEY}&units=${CONFIG.DEFAULT_UNIT}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch current location weather.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
