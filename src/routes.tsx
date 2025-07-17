import HeroesTableSkeleton from '@/components/HeroesTableSkeleton';
import { HeroesList } from './components/HeroesList';
import React from 'react';

const ItemsPage = React.lazy(() => import('./components/ItemsPage'));
// const PlayerPage = React.lazy(() => import('./components/PlayerPage'));

const routes = [
  {
    path: '/heroes',
    element: (
      <React.Suspense fallback={<HeroesTableSkeleton />}>
        <HeroesList />
      </React.Suspense>
    ),
  },
  {
    path: '/items',
    element: (
      <React.Suspense fallback={<HeroesTableSkeleton />}>
        <ItemsPage />
      </React.Suspense>
    ),
  },
  //   {
  //     path: '/player',
  //     element: (
  //       <React.Suspense fallback={<div>Loading...</div>}>
  //         <PlayerPage />
  //       </React.Suspense>
  //     ),
  //   },
  {
    path: '/',
    element: <ItemsPage />,
  },
];

export default routes;
