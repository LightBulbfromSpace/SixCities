import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { LocationType } from '../types';
import { Map, TileLayer } from 'leaflet';

const TILE_LAYER_URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: LocationType): Map | null {
  const [map, setMap] = useState<Map|null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current === null || isRenderedRef.current) {
      return;
    }

    const instance = new Map(mapRef.current, {
      center: {
        lat: location.latitude,
        lng: location.longitude,
      },
      zoom: location.zoom,
    });

    const layer = new TileLayer(
      TILE_LAYER_URL_TEMPLATE,
      {
        attribution: TILE_LAYER_ATTRIBUTION,
      }
    );

    instance.addLayer(layer);

    setMap(instance);
    isRenderedRef.current = true;
  }, [mapRef, location]);

  return map;
}

export {
  useMap,
};
