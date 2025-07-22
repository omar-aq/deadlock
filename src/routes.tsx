import React from 'react';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const HeroesPage = React.lazy(() => import('./pages/HeroesPage'));
const ItemsPage = React.lazy(() => import('./pages/ItemsPage'));
const Leaderboard = React.lazy(() => import('./pages/LeaderBoardPage'));

const routes = [
  {
    path: '/heroes',
    element: <HeroesPage />,
  },
  {
    path: '/items',
    element: <ItemsPage />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
];

export default routes;
