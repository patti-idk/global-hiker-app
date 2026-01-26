import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Route } from '@shared/schema';

interface MapComponentProps {
  routes?: Route[];
  onMarkerClick?: (route: Route) => void;
  className?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export function MapComponent({ 
  routes = [], 
  onMarkerClick, 
  className,
  initialCenter = [120.8037, 23.4700], // Default center near Taiwan/Alishan
  initialZoom = 3
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    // Use the token from requirements/context
    mapboxgl.accessToken = 'pk.eyJ1IjoieXNrLWlkayIsImEiOiJjbWtxaXVmOGUwc2JyM2dxOGE2bHJzNzBkIn0.mGpomLeqze28JD0VGkupfA';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: initialCenter,
      zoom: initialZoom,
      pitch: 45, // Add some pitch for 3D effect
      bearing: 0,
    });

    map.current.on('load', () => {
      if (!map.current) return;
      setLoaded(true);

      // Add 3D terrain
      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
      
      // Add sky layer for atmosphere
      map.current.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers when routes change
  useEffect(() => {
    if (!map.current || !loaded) return;

    // Remove existing markers (not implemented for simplicity, assuming pure replacement or static list in this demo)
    // In a real app, you'd keep track of marker instances.

    routes.forEach(route => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundImage = `url(${route.imageUrl})`;
      el.style.width = '48px';
      el.style.height = '48px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '50%';
      el.style.border = '3px solid #E67E22';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';

      el.addEventListener('click', () => {
        if (onMarkerClick) onMarkerClick(route);
        
        map.current?.flyTo({
          center: [route.lng, route.lat],
          zoom: 13,
          pitch: 60,
          essential: true,
          duration: 2000
        });
      });

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div style="font-family: 'DM Sans', sans-serif; padding: 4px;">
            <h3 style="margin:0; font-family: 'Oswald', sans-serif; color: #1B3022;">${route.name}</h3>
            <p style="margin:4px 0 0; color: #666; font-size: 12px;">${route.lengthKm} km • ${route.difficulty}</p>
          </div>
        `);

      new mapboxgl.Marker(el)
        .setLngLat([route.lng, route.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

  }, [routes, loaded, onMarkerClick]);

  return (
    <div className={className} ref={mapContainer} />
  );
}
