import React, {useEffect} from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectTheme} from './store/slices/themeSlice';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import ClientsPage from './components/ClientsPage/ClientsPage';
import ClientDetailsPage from './components/ClientDetailsPage/ClientDetailsPage';
import NetworkStats from './components/NetworkStats/NetworkStats';
import SettingsPage from './components/SettingsPage/SettingsPage';
import Login from './components/Login/Login';
import {fetchClients} from './store/slices/clientsSlice';
import {fetchNetworkStats} from './store/slices/networkSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {selectAuth} from './store/slices/authSlice';

const App: React.FC = () => {
  const theme = useSelector(selectTheme);
  const {isAuthenticated} = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchClients() as any);
      dispatch(fetchNetworkStats() as any);

      // Poll for updates
      const intervalId = setInterval(() => {
        dispatch(fetchClients() as any);
        dispatch(fetchNetworkStats() as any);
      }, 30000); // Every 30 seconds

      return () => clearInterval(intervalId);
    }
  }, [dispatch, isAuthenticated]);

  return (
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout/>
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="clients" element={<ClientsPage/>}/>
            <Route path="clients/:id" element={<ClientDetailsPage/>}/>
            <Route path="network" element={<NetworkStats/>}/>
            <Route path="settings" element={<SettingsPage/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </HashRouter>
  );
};

export default App;