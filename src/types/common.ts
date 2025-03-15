
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

export interface WeatherRecord {
  id: string;
  cloudiness: number;
  createdAt: string;
  description: string;
  lat: number;
  lng: number;
  place: string;
  searchDate: string;
  temperature: number;
  windSpeed: number;
}

export interface SearchHistoryItem {
  id: string;
  lat: number;
  lng: number;
  place: string;
  searchedAt: string;
  weatherRecord?: WeatherRecord;
}
export interface LatLng {
  lat: number;
  lng: number;
}