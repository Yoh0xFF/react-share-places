import React, { useEffect, useRef } from 'react';

import './Map.css';

interface MapProps {
  className?: string;
  style?: React.CSSProperties;

  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function Map(props: MapProps): JSX.Element {
  const mapRef = useRef(null);

  const { center, zoom } = props;

  useEffect(() => {
    // @ts-ignore
    const map = new (window as any).google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new (window as any).google.maps.Marker({
      position: center,
      map: map,
    });
  }, [center, zoom]);

  return (
    <div
      id='map'
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    />
  );
}
