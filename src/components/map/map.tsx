'use client';

import { useState, useCallback, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { getWeatherData } from "@/actions/weather-actions";


interface LatLng {
  lat: number;
  lng: number;
}

interface MapProps {
  onLocationSelect: (location: LatLng) => void;
  initialLocation?: LatLng;
}

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const defaultCenter = {
  lat: 52.2297,
  lng: 21.0122,
};

const WeatherMap: React.FC<MapProps> = ({ onLocationSelect, initialLocation }) => {
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
      getWeatherData(newLocation)
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
};

export default WeatherMap;