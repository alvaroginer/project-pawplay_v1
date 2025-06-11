import { useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";

interface MapMarkerProps {
  map: Map;
  longitude: number;
  latitude: number;
}

export const MapMarker = ({ map, longitude, latitude }: MapMarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current?.remove();
    };
  }, [map, longitude, latitude]);

  return null;
};
