import React from 'react';
import {FiArrowDown, FiArrowUp, FiClock, FiDownload, FiUpload, FiUser, FiUsers} from 'react-icons/fi';
import * as styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string;
  total?: number;
  icon: 'user' | 'users' | 'download' | 'upload' | 'clock';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({
                                             title,
                                             value,
                                             total,
                                             icon,
                                             trend,
                                             trendValue
                                           }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'user':
        return <FiUser size={24}/>;
      case 'users':
        return <FiUsers size={24}/>;
      case 'download':
        return <FiDownload size={24}/>;
      case 'upload':
        return <FiUpload size={24}/>;
      case 'clock':
        return <FiClock size={24}/>;
      default:
        return <FiUser size={24}/>;
    }
  };

  const getTrendClass = () => {
    switch (trend) {
      case 'up':
        return styles.trendUp;
      case 'down':
        return styles.trendDown;
      default:
        return styles.trendNeutral;
    }
  };

  const renderTrend = () => {
    if (!trend || !trendValue) return null;

    return (
        <div className={`${styles.trend} ${getTrendClass()}`}>
          {trend === 'up' && <FiArrowUp size={14}/>}
          {trend === 'down' && <FiArrowDown size={14}/>}
          <span>{trendValue}</span>
        </div>
    );
  };

  return (
      <div className={styles.card}>
        <div className={styles.iconContainer}>{renderIcon()}</div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.valueContainer}>
            <p className={styles.value}>{value}</p>
            {total !== undefined && (
                <span className={styles.total}>of {total}</span>
            )}
          </div>
          {renderTrend()}
        </div>
      </div>
  );
};

export default StatCard;