import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FiPlus, FiSearch} from 'react-icons/fi';
import {selectAllClients, selectClientsStatus} from '../../store/slices/clientsSlice';
import ClientStatusTable from '../ClientStatusTable/ClientStatusTable';
import ClientForm from '../ClientForm/ClientForm';
import * as styles from './ClientsPage.module.css';

const ClientsPage: React.FC = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectAllClients);
  const status = useSelector(selectClientsStatus);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredClients = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.virtualIp.includes(searchTerm) ||
      client.realIp.includes(searchTerm)
  );

  return (
      <div className={styles.clientsPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Clients</h1>
          <button
              className={styles.addButton}
              onClick={() => setShowAddForm(true)}
          >
            <FiPlus size={18}/>
            <span>Add Client</span>
          </button>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchInput}>
            <FiSearch className={styles.searchIcon}/>
            <input
                type="text"
                placeholder="Search clients by name or IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          {status === 'loading' && (
              <div className={styles.loading}>Loading clients...</div>
          )}

          {status === 'failed' && (
              <div className={styles.error}>Failed to load clients</div>
          )}

          {status === 'succeeded' && filteredClients.length === 0 && (
              <div className={styles.empty}>
                {searchTerm ? 'No clients found matching your search' : 'No clients found'}
              </div>
          )}

          {status === 'succeeded' && filteredClients.length > 0 && (
              <ClientStatusTable clients={filteredClients}/>
          )}
        </div>

        {showAddForm && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <ClientForm onClose={() => setShowAddForm(false)}/>
              </div>
            </div>
        )}
      </div>
  );
};

export default ClientsPage;