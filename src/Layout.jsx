import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import EventNav from './EventNav.jsx'; // make sure the path is correct

function Layout() {
  const location = useLocation();

  // Pages where you DON'T want EventNav
  const noNavPages = ['/FilterEvents', '/checklist'];

  return (
    <>
      {!noNavPages.includes(location.pathname) && <EventNav />}
      <Outlet />
    </>
  );
}

export default Layout;

