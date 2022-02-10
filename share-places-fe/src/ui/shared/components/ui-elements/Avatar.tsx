import React from 'react';

import './Avatar.css';

export interface AvatarProps {
  image: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export default function Avatar(props: AvatarProps): JSX.Element {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.height }}
      />
    </div>
  );
}
