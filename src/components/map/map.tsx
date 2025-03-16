"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Libraries, useLoadScript } from "@react-google-maps/api";
import { LatLng } from "../../types/common";
import { containerStyle, defaultCenter } from "../../constants/common";

interface MapProps {
  onLocationSelect: (location: LatLng) => void;
  initialLocation?: LatLng;
}

const libraries = ["marker"];

export default function WeatherMap({
  onLocationSelect,
  initialLocation,
}: MapProps) {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(
    initialLocation || null
  );
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as Libraries,
  });

  const updateMarker = useCallback((location: LatLng) => {
    if (!mapRef.current || !window.google?.maps?.marker) return;

    if (markerRef.current) {
      markerRef.current.map = null;
    }

    const { AdvancedMarkerElement } = window.google.maps.marker;

    if (AdvancedMarkerElement) {
      markerRef.current = new AdvancedMarkerElement({
        map: mapRef.current,
        position: location,
        title: "Selected Location",
      });
    }
  }, []);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      updateMarker(selectedLocation);
    }
  }, [selectedLocation, updateMarker]);

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      mapRef.current = map;

      if (initialLocation) {
        setSelectedLocation(initialLocation);
        onLocationSelect(initialLocation);
      }
    },
    [initialLocation, onLocationSelect]
  );

  const onUnmount = useCallback(function callback() {
    if (markerRef.current) {
      markerRef.current.map = null;
      markerRef.current = null;
    }
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

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedLocation || initialLocation || defaultCenter}
        zoom={selectedLocation || initialLocation ? 10 : 6}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          mapId: "DEMO_MAP_ID",
        }}
      />
    </div>
  );
}
