'use client';

import { useState, useCallback, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { LatLng } from "@/types/common";
import { containerStyle, defaultCenter } from "@/constants/common";

interface MapProps {
  onLocationSelect: (location: LatLng) => void;
  initialLocation?: LatLng;
}


export default function WeatherMap({ onLocationSelect, initialLocation }: MapProps) {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(initialLocation || null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
    
    if (initialLocation) {
      setSelectedLocation(initialLocation);
      onLocationSelect(initialLocation);
    }
  }, [initialLocation, onLocationSelect]);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
  }, []);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setSelectedLocation(newLocation);
      onLocationSelect(newLocation);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={initialLocation || defaultCenter}
          zoom={initialLocation ? 10 : 6}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}