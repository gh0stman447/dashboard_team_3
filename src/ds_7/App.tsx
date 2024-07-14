import React, { useEffect, useState } from 'react';
import './App.scss';
import '../output.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import DashBoard_1 from './src/pages/DashBoard_1';
import { Route } from './src/components/Route';
import { UrlState } from 'bi-internal/core';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoard_1 />
  }
]);

const navigateToDashBoard = (dboard: string) => {
  UrlState.navigate({ dboard });
};

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Route pageName={['1']}>
        <>
          <div>1йцвцацуацфацффца</div>
          <button onClick={() => navigateToDashBoard('6')}>Навигация</button>
        </>
      </Route>
      <Route pageName={['2']}>
        <div>2цафццуфцацфлуцаадцуаьфуцжадфуцд</div>
      </Route> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
