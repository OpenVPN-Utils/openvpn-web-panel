import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FiX} from 'react-icons/fi';
import {createClient} from '../../store/slices/clientsSlice';
import {ClientFormData} from '../../types';
import * as styles from './ClientForm.module.css';

interface ClientFormProps {
  onClose: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({onClose}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('Client name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await dispatch(createClient(formData) as any);
      onClose();
    } catch (err) {
      setError('Failed to create client');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Add New Client</h2>
          <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
          >
            <FiX size={20}/>
          </button>
        </div>

        {error && (
            <div className={styles.error}>{error}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Client Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter client name"
                className={styles.input}
                required
            />
            <p className={styles.helpText}>
              The name will be used for the client certificate
            </p>
          </div>

          <div className={styles.formActions}>
            <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
                disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
  );
};

export default ClientForm;