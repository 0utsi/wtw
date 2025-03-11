"use client";

import { useState, useCallback, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { LatLng } from "@/types/location";

interface MapProps {
  onLocationSelect: (location: LatLng) => void;
}

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const defaultCenter = {
  lat: 52.2297,
  lng: 21.0122,
};

const WeatherMap: React.FC<MapProps> = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

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
    <div className="map-container w-full">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={6}
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
