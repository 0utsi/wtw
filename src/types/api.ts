export interface WeatherData {
    id: string;
    city: string;
    latitude: number;
    longitude: number;
    temperature: number;
    description: string;
    windSpeed: number;
    cloudiness: number;
    createdAt: string;
  }
  
  export interface SearchHistoryItem {
    id: string;
    city: string;
    latitude: number;
    longitude: number;
    searchedAt: string;
    weatherRecord?: {
      id: string;
      temperature: number;
      description: string;
      createdAt: string;
    };
  }
  
  export interface WeatherSearchParams {
    latitude: number;
    longitude: number;
    city?: string;
  }
  
  export interface ApiError {
    message: string;
    error?: string;
    statusCode?: number;
  }