import React from 'react';

import './MainHeader.css';

export interface MainHeaderProps {
  children: React.ReactNode;
}

export default function MainHeader(props: MainHeaderProps): JSX.Element {
  return <header className='main-header'>{props.children}</header>;
}
