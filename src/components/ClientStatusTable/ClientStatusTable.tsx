import React from 'react';
import {Link} from 'react-router-dom';
import {FiCircle, FiEye} from 'react-icons/fi';
import {Client} from '../../types';
import {formatBytes, formatDateTime} from '../../utils/formatters';
import * as styles from './ClientStatusTable.module.css';

interface ClientStatusTableProps {
  clients: Client[];
}

const ClientStatusTable: React.FC<ClientStatusTableProps> = ({clients}) => {
  if (!clients || clients.length === 0) {
    return <div className={styles.empty}>No clients found</div>;
  }

  return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Virtual IP</th>
            <th>Real IP</th>
            <th>Connected Since</th>
            <th>Traffic (Down/Up)</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {clients.map((client) => (
              <tr key={client.id}>
                <td>
                <span className={styles.status}>
                  <FiCircle
                      className={`${styles.statusIndicator} ${
                          client.status === 'connected' ? styles.connected : styles.disconnected
                      }`}
                  />
                  {client.status === 'connected' ? 'Online' : 'Offline'}
                </span>
                </td>
                <td>{client.name}</td>
                <td>{client.virtualIp}</td>
                <td>{client.realIp}</td>
                <td>
                  {client.connectedSince
                      ? formatDateTime(client.connectedSince)
                      : client.lastConnection
                          ? `Last seen: ${formatDateTime(client.lastConnection)}`
                          : 'Never connected'
                  }
                </td>
                <td>
                  {formatBytes(client.bytesReceived)} / {formatBytes(client.bytesSent)}
                </td>
                <td>
                  <Link to={`/clients/${client.id}`} className={styles.viewButton}>
                    <FiEye/>
                    <span className={styles.viewButtonText}>View</span>
                  </Link>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default ClientStatusTable;