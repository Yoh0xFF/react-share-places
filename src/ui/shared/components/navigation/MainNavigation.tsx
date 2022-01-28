import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';
import NavLinks from './NavLinks';

import MainHeader from '@app/ui/shared/components/navigation/MainHeader';
import SideDrawer from '@app/ui/shared/components/navigation/SideDrawer';
import Backdrop from '@app/ui/shared/components/ui-elements/Backdrop';

export default function MainNavigation(): JSX.Element {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawerHandler = () => setDrawerIsOpen(!drawerIsOpen);

  return (
    <>
      <Backdrop show={drawerIsOpen} onClick={toggleDrawerHandler} />

      <SideDrawer show={drawerIsOpen} onClick={toggleDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className='main-navigation__menu-btn'
          onClick={toggleDrawerHandler}
        >
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
    </>
  );
}
