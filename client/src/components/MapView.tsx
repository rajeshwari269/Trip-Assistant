import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ lat, lon }: { lat: number; lon: number }) => {
  useEffect(() => {
    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup('Location').openPopup();

    // Cleanup function
    return () => {
      void map.remove();
    };
  }, [lat, lon]);

  return <div id="map" className="h-64 w-full rounded shadow mb-4" />;
};

export default MapView;
