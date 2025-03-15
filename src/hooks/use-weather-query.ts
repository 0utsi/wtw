'use client';

import { useQuery } from '@tanstack/react-query';
import { LatLng } from '@/types/common';
import { WeatherData, SearchHistoryItem } from '@/types/common';
import { getWeatherData, getSearchHistory } from '@/actions/weather-actions';


export function useWeatherData(location: LatLng | null) {
  return useQuery<WeatherData>({
    queryKey: ['weather', location?.lat, location?.lng],
    queryFn: async () => {
      if (!location) {
        throw new Error('No location provided')
    }
      return await getWeatherData(location);
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 5, 
    retry: 1,
  });
}

export function useSearchHistory() {
  return useQuery<SearchHistoryItem[]>({
    queryKey: ['history'],
    queryFn: () => getSearchHistory(),
    staleTime: 1000 * 60 * 1, 
  });
}