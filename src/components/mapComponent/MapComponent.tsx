import { useRef, useEffect } from "react";
import { GeoPoint } from "firebase/firestore";
import { MapMarker } from "./MapMarker";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapComponente.css";

export const MapComponent = ({
  eventLocation,
}: {
  eventLocation: GeoPoint;
}) => {
  const { longitude, latitude } = eventLocation;
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
      center: [longitude, latitude],
      zoom: 15,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div
      id='map-container'
      role='region'
      aria-label='Event location map'
      ref={mapContainerRef}
      className='map-container'
    >
      {" "}
      {mapRef.current && (
        <MapMarker
          map={mapRef.current}
          longitude={longitude}
          latitude={latitude}
        />
      )}
    </div>
  );
};
