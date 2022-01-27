import React from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';
import NavLinks from './NavLinks';

import MainHeader from '@app/ui/shared/components/navigation/MainHeader';

export default function MainNavigation(): JSX.Element {
  return (
    <MainHeader>
      <button className='main-navigation__menu-btn'>
        <span />
        <span />
        <span />
      </button>
      <h1 className='main-navigation__title'>
        <Link to='/'>Your Places</Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
}
