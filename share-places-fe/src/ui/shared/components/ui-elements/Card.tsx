import React from 'react';

import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Card(props: CardProps): JSX.Element {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
}
