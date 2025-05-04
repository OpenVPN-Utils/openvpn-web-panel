import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchBandwidthHistory, selectBandwidthHistory, selectNetworkStats} from '../../store/slices/networkSlice';
import {selectActiveClients, selectAllClients} from '../../store/slices/clientsSlice';
import StatCard from '../StatCard/StatCard';
import BandwidthChart from '../Charts/BandwidthChart';
import ClientStatusTable from '../ClientStatusTable/ClientStatusTable';
import {formatBytes, formatDuration} from '../../utils/formatters';
import * as styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectNetworkStats);
  const bandwidthHistory = useSelector(selectBandwidthHistory);
  const clients = useSelector(selectAllClients);
  const activeClients = useSelector(selectActiveClients);

  useEffect(() => {
    dispatch(fetchBandwidthHistory() as any);
  }, [dispatch]);

  return (
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <span className={styles.subtitle}>OpenVPN Server Overview</span>
        </div>

        <div className={styles.statsGrid}>
          <StatCard
              title="Active Connections"
              value={activeClients.length.toString()}
              total={clients.length}
              icon="users"
              trend="up"
              trendValue="5%"
          />
          <StatCard
              title="Download"
              value={stats ? formatBytes(stats.bandwidth.download) + '/s' : 'Loading...'}
              icon="download"
          />
          <StatCard
              title="Upload"
              value={stats ? formatBytes(stats.bandwidth.upload) + '/s' : 'Loading...'}
              icon="upload"
          />
          <StatCard
              title="Uptime"
              value={stats ? formatDuration(stats.uptime) : 'Loading...'}
              icon="clock"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Bandwidth Usage (Last 24 Hours)</h2>
            </div>
            <div className={styles.cardContent}>
              <BandwidthChart data={bandwidthHistory}/>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.clientsCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Clients</h2>
              <Link to="/clients" className={styles.viewAll}>
                View All
              </Link>
            </div>
            <div className={styles.cardContent}>
              <ClientStatusTable clients={clients.slice(0, 5)}/>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;