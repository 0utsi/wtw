'use client';

import { useState } from 'react';
import WeatherMap from '@/components/map/GoogleMap';
import { LatLng } from '@/types/location';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLocationSelect = (location: LatLng) => {
    setIsLoading(true);
    console.log('Wybrana lokalizacja:', location);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
   
      
      <div className="relative w-full max-w-6xl">
        <WeatherMap onLocationSelect={handleLocationSelect} />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </main>
  );
}