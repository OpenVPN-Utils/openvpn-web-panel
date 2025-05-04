import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {FiArrowLeft, FiClock, FiDownload, FiServer, FiTrash2, FiUpload, FiUser} from 'react-icons/fi';
import {deleteClient, fetchClientById, selectClientById} from '../../store/slices/clientsSlice';
import {formatBytes, formatDateTime} from '../../utils/formatters';
import * as styles from './ClientDetailsPage.module.css';
import {useAppDispatch, useAppSelector} from "../../store/store";

const ClientDetailsPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const client = useAppSelector(selectClientById);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteClient(id));
      navigate('/clients');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!client) {
    return <div className={styles.loading}>Loading client details...</div>;
  }

  const infoItems = [
    {icon: <FiUser size={18}/>, title: 'Client ID', value: client.id},
    {icon: <FiServer size={18}/>, title: 'Virtual IP', value: client.virtualIp},
    {icon: <FiServer size={18}/>, title: 'Real IP', value: client.realIp},
    {icon: <FiClock size={18}/>, title: 'Created At', value: formatDateTime(client.createdAt)},
    {
      icon: <FiClock size={18}/>,
      title: client.status === 'connected' ? 'Connected Since' : 'Last Connection',
      value: client.status === 'connected'
          ? (client.connectedSince ? formatDateTime(client.connectedSince) : 'N/A')
          : (client.lastConnection ? formatDateTime(client.lastConnection) : 'Never connected')
    }
  ];

  const statsItems = [
    {icon: <FiDownload size={20}/>, title: 'Downloaded', value: formatBytes(client.bytesReceived)},
    {icon: <FiUpload size={20}/>, title: 'Uploaded', value: formatBytes(client.bytesSent)}
  ];

  const actionButtons = [{
    name: 'Download Configuration',
    onclick: () => {
    }
  }, {
    name: 'Revoke Access',
    onclick: () => {
    }
  }, {
    name: 'Reset Connection',
    onclick: () => {
    }
  }];

  return (
      <div className={styles.clientDetails}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate('/clients')}>
            <FiArrowLeft size={18}/> Back to Clients
          </button>
          <button className={styles.deleteButton} onClick={() => setShowDeleteModal(true)}>
            <FiTrash2 size={18}/> Delete Client
          </button>
        </div>

        <div className={styles.clientCard}>
          <div className={styles.clientHeader}>
            <h1>{client.name}</h1>
            <div
                className={`${styles.statusBadge} ${client.status === 'connected' ? styles.connected : styles.disconnected}`}>
              {client.status === 'connected' ? 'Connected' : 'Disconnected'}
            </div>
          </div>

          <div className={styles.infoGrid}>
            {infoItems.map((item, index) => (
                <div key={index} className={styles.infoItem}>
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div className={styles.infoContent}>
                    <h3>{item.title}</h3>
                    <p>{item.value}</p>
                  </div>
                </div>
            ))}
          </div>

          <div className={styles.statsSection}>
            <h2>Traffic Statistics</h2>
            <div className={styles.statsGrid}>
              {statsItems.map((stat, index) => (
                  <div key={index} className={styles.statCard}>
                    <div className={styles.statIcon}>{stat.icon}</div>
                    <div className={styles.statContent}>
                      <h3>{stat.title}</h3>
                      <p>{stat.value}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className={styles.actionsSection}>
            <h2>Client Actions</h2>
            <div className={styles.actionButtons}>
              {actionButtons.map((buttonConfig, index) => (
                  <button key={index}
                          className={styles.actionButton}
                          onClick={buttonConfig.onclick}>
                    {buttonConfig.name}
                  </button>
              ))}
            </div>
          </div>
        </div>

        {showDeleteModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2>Delete Client</h2>
                <p>Are you sure you want to delete client "{client.name}"? This action cannot be undone.</p>
                <div className={styles.modalActions}>
                  <button
                      className={styles.cancelButton}
                      onClick={() => setShowDeleteModal(false)}
                      disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                      className={styles.confirmButton}
                      onClick={handleDelete}
                      disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Client'}
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default ClientDetailsPage;