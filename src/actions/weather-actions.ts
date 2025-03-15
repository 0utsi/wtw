"use server";

import { WeatherData } from "@/types/common";
import { toast } from "sonner";

interface LatLng {
  lat: number;
  lng: number;
}

const API_URL = process.env.API_URL || "http://localhost:3001/api";

export async function getWeatherData(location: LatLng): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${API_URL}/weather?lat=${location.lat}&lng=${location.lng}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch {
    toast.error("Error while getting weather");
    throw Error();
  }
}

export async function getSearchHistory() {
  try {
    const response = await fetch(`${API_URL}/weather/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Nie udało się pobrać historii");
    }

    return response.json();
  } catch (error) {
    console.error("Błąd podczas pobierania historii:", error);
    throw error;
  }
}
