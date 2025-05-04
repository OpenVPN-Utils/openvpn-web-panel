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

  useEffect(() => {
    if (id) {
      dispatch(fetchClientById(id) as any);
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      await dispatch(deleteClient(id) as any);
      navigate('/clients');
    } catch (error) {
      // Handle error
    } finally {
      setIsDeleting(false);
    }
  };

  if (!client) {
    return (
        <div className={styles.loading}>
          Loading client details...
        </div>
    );
  }

  return (
      <div className={styles.clientDetails}>
        <div className={styles.header}>
          <button
              className={styles.backButton}
              onClick={() => navigate('/clients')}
          >
            <FiArrowLeft size={18}/>
            <span>Back to Clients</span>
          </button>

          <button
              className={styles.deleteButton}
              onClick={() => setShowDeleteModal(true)}
          >
            <FiTrash2 size={18}/>
            <span>Delete Client</span>
          </button>
        </div>

        <div className={styles.clientCard}>
          <div className={styles.clientHeader}>
            <h1 className={styles.clientName}>{client.name}</h1>
            <div
                className={`${styles.statusBadge} ${client.status === 'connected' ? styles.connected : styles.disconnected}`}>
              {client.status === 'connected' ? 'Connected' : 'Disconnected'}
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FiUser size={18}/>
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Client ID</h3>
                <p className={styles.infoValue}>{client.id}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FiServer size={18}/>
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Virtual IP</h3>
                <p className={styles.infoValue}>{client.virtualIp}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FiServer size={18}/>
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Real IP</h3>
                <p className={styles.infoValue}>{client.realIp}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FiClock size={18}/>
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>Created At</h3>
                <p className={styles.infoValue}>{formatDateTime(client.createdAt)}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FiClock size={18}/>
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>
                  {client.status === 'connected' ? 'Connected Since' : 'Last Connection'}
                </h3>
                <p className={styles.infoValue}>
                  {client.status === 'connected' && client.connectedSince
                      ? formatDateTime(client.connectedSince)
                      : client.lastConnection
                          ? formatDateTime(client.lastConnection)
                          : 'Never connected'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>Traffic Statistics</h2>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiDownload size={20}/>
                </div>
                <div className={styles.statContent}>
                  <h3 className={styles.statTitle}>Downloaded</h3>
                  <p className={styles.statValue}>{formatBytes(client.bytesReceived)}</p>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiUpload size={20}/>
                </div>
                <div className={styles.statContent}>
                  <h3 className={styles.statTitle}>Uploaded</h3>
                  <p className={styles.statValue}>{formatBytes(client.bytesSent)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionsSection}>
            <h2 className={styles.sectionTitle}>Client Actions</h2>

            <div className={styles.actionButtons}>
              <button className={styles.actionButton}>
                Download Configuration
              </button>
              <button className={styles.actionButton}>
                Revoke Access
              </button>
              <button className={styles.actionButton}>
                Reset Connection
              </button>
            </div>
          </div>
        </div>

        {showDeleteModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Delete Client</h2>
                <p className={styles.modalText}>
                  Are you sure you want to delete client "{client.name}"? This action cannot be undone.
                </p>
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