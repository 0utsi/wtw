
export interface WeatherData {
  id: string;
  place: string;
  lat: number;
  lng: number;
  temperature: number;
  description: string;
  windSpeed: number;
  cloudiness: number;
  createdAt: string;
}

export interface SearchHistoryItem {
  id: string;
  place: string;
  lat: number;
  lng: number;
  searchedAt: string;
  weatherRecord?: {
    id: string;
    temperature: number;
    description: string;
    createdAt: string;
  };
}

export interface LatLng {
  lat: number;
  lng: number;
}