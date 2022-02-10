import React from 'react';

import './LoadingSpinner.css';

export interface LoadingSpinnerProps {
  asOverlay?: boolean;
}

export default function LoadingSpinner(
  props: LoadingSpinnerProps
): JSX.Element {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className='lds-dual-ring' />
    </div>
  );
}
