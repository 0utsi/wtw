"use client";

import { useState } from "react";
import WeatherMap from "@/components/map/map";
import { LatLng } from "@/types/location";
import Loader from "@/components/ui/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = (location: LatLng) => {
    setIsLoading(true);
    console.log("Wybrana lokalizacja:", location);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (

      <div className="relative w-full">
        <WeatherMap onLocationSelect={handleLocationSelect} />
        {isLoading && <Loader />}
      </div>
  
  );
}
