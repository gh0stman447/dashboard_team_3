import React from 'react';
import './App.scss';
import '../output.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import DashBoard_1 from './src/pages/DashBoard_1';
import { Route } from './src/components/Route';
import DashBoard_2 from './src/pages/DashBoard_2';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Route pageName={['1']}>
        <DashBoard_1 />
      </Route>
      <Route pageName={['2']}>
        <DashBoard_2 />
      </Route>
    </QueryClientProvider>
  );
}

export default App;