'use client';

import { useState, useEffect } from 'react';
import WeatherMap from '@/components/map/map';
import { LatLng } from '@/types/common';
import Loader from '@/components/ui/loader';
import WeatherDialog from '@/components/weather/weather-dialog';
import { useWeatherData } from '@/hooks/use-weather-query';
import { toast } from 'sonner';

interface WeatherClientProps {
  initialLat?: number;
  initialLng?: number;
}

export default function WeatherClient({ initialLat, initialLng }: WeatherClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { data: weatherData, isLoading, isError } = useWeatherData(selectedLocation);

  useEffect(() => {
    if (weatherData && !isLoading) {
      setDialogOpen(true);
    }
  }, [weatherData, isLoading]);

  const handleLocationSelect = (location: LatLng) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    if (isError) {
      toast.error('Nie udało się pobrać pogody dla danego miejsca');
    }
  }, [isError]);


  return (
    <div className="relative w-full">
      
      <WeatherMap 
        onLocationSelect={handleLocationSelect} 
        initialLocation={initialLat && initialLng ? { lat: initialLat, lng: initialLng } : undefined}
      />
      
      {isLoading && <Loader />}
      
      <WeatherDialog 
        weatherData={weatherData ?? null}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}