import React, {useEffect} from 'react';
import {createHashRouter, Navigate, RouterProvider} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from './store/store';
import {selectTheme} from './store/slices/themeSlice';
import {selectAuth} from './store/slices/authSlice';
import {fetchClients} from './store/slices/clientsSlice';
import {fetchBandwidthHistory, fetchNetworkStats} from './store/slices/networkSlice';

import Layout from './components/Layout/Layout';
import NetworkStats from './components/Dashboard/Dashboard';
import Dashboard from './components/Dashboard/Dashboard';
import ClientsPage from './components/ClientsPage/ClientsPage';
import ClientDetailsPage from './components/ClientDetailsPage/ClientDetailsPage';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SettingsPage from './components/SettingsPage/SettingsPage';


const App: React.FC = () => {
  const theme = useAppSelector(selectTheme);
  const {isAuthenticated} = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  // Установка темы
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Загрузка данных и периодическое обновление
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadData = () => {
      dispatch(fetchClients());
      dispatch(fetchNetworkStats());
    };

    loadData();
    const intervalId = setInterval(loadData, 30000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const router = createHashRouter([
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/',
      element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout/>
          </ProtectedRoute>
      ),
      children: [
        {index: true, element: <Navigate to="/dashboard" replace/>},
        {
          path: 'dashboard', element: <Dashboard/>, loader: () => {
            dispatch(fetchBandwidthHistory() as any)
            return null;
          }
        },
        {path: 'clients', element: <ClientsPage/>},
        {path: 'clients/:id', element: <ClientDetailsPage/>},
        {
          path: 'network', element: <NetworkStats/>, loader: () => {
            dispatch(fetchBandwidthHistory() as any)
            return null;
          }
        },
        {path: 'settings', element: <SettingsPage/>},
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace/>,
    },
  ], {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
    },
  });

  return <RouterProvider router={router}/>;
};

export default App;