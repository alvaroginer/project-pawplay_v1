import { useRef, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { GeoPoint } from "firebase/firestore";
import "mapbox-gl/dist/mapbox-gl.css";

export const MapComponent = ({
  eventLocation,
}: {
  eventLocation: GeoPoint;
}) => {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWdpbmVyIiwiYSI6ImNtYm5mcjVuZTFnb3YyanBqaTZkcTUwNW0ifQ.8Xfzx_-MoX4V_uvM_Hhtkw";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [eventLocation.longitude, eventLocation.latitude],
      zoom: 12,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [eventLocation]);

  return (
    <div
      id='map-container'
      role='region'
      aria-label='Event location map'
      ref={mapContainerRef}
      style={{ width: "100%", minHeight: "178px", maxHeight: "781px" }}
    />
  );
};
