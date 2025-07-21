import React from 'react';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const HeroesPage = React.lazy(() => import('./pages/HeroesPage'));
const ItemsPage = React.lazy(() => import('./pages/ItemsPage'));
// const PlayerPage = React.lazy(() => import('./components/PlayerPage'));

const routes = [
  {
    path: '/heroes',
    element: <HeroesPage />,
  },
  {
    path: '/items',
    element: <ItemsPage />,
  },
  // {
  //   path: '/player',
  //   element: <PlayerPage />,
  // },
  {
    path: '/',
    element: <HomePage />,
  },
];

export default routes;
