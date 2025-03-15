'use server';
import { WeatherData } from "@/types/common";
import { toast } from "sonner";

interface LatLng {
  lat: number;
  lng: number;
}

const API_URL = process.env.API_URL || 'http://localhost:3001/api';

export async function getWeatherData(location: LatLng): Promise<WeatherData> {
  try {
    const response = await fetch(`${API_URL}/weather?lat=${location.lat}&lng=${location.lng}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch  {
    toast.error("Error fetching data")
    throw Error()
  }
}

export async function getSearchHistory() {
  try {
    const response = await fetch(`${API_URL}/weather/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } 
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch search history:', error);
    throw error;
  }
}