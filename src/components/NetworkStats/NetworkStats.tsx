import React, {useEffect} from 'react';
import {fetchBandwidthHistory, selectBandwidthHistory, selectNetworkStats} from '../../store/slices/networkSlice';
import BandwidthChart from '../Charts/BandwidthChart';
import TrafficChart from '../Charts/TrafficChart';
import LoadAverageChart from '../Charts/LoadAverageChart';
import StatCard from '../StatCard/StatCard';
import {formatBytes, formatDuration} from '../../utils/formatters';
import * as styles from './NetworkStats.module.css';
import {useAppDispatch, useAppSelector} from "../../store/store";

const NetworkStats: React.FC = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectNetworkStats);
  const bandwidthHistory = useAppSelector(selectBandwidthHistory);

  if (!stats) {
    return (
        <div className={styles.loading}>
          Loading network statistics...
        </div>
    );
  }

  return (
      <div className={styles.networkStats}>
        <div className={styles.header}>
          <h1 className={styles.title}>Network Statistics</h1>
          <span className={styles.subtitle}>Monitor your VPN network performance</span>
        </div>

        <div className={styles.statsGrid}>
          <StatCard
              title="Current Download"
              value={formatBytes(stats.bandwidth.download) + '/s'}
              icon="download"
          />
          <StatCard
              title="Current Upload"
              value={formatBytes(stats.bandwidth.upload) + '/s'}
              icon="upload"
          />
          <StatCard
              title="Total Connections"
              value={stats.connections.total.toString()}
              icon="users"
          />
          <StatCard
              title="Server Uptime"
              value={formatDuration(stats.uptime)}
              icon="clock"
          />
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Bandwidth Usage (Last 24 Hours)</h2>
            </div>
            <div className={styles.cardContent}>
              <BandwidthChart data={bandwidthHistory}/>
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Load Average</h2>
            </div>
            <div className={styles.cardContent}>
              <LoadAverageChart loadAverage={stats.loadAverage}/>
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Client Traffic Distribution</h2>
            </div>
            <div className={styles.cardContent}>
              <TrafficChart/>
            </div>
          </div>
        </div>
      </div>
  );
};

export default NetworkStats;