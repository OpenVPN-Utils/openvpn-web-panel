import React, {useState} from 'react';
import {FiMoon, FiSave, FiSun} from 'react-icons/fi';
import {selectTheme, setTheme} from '../../store/slices/themeSlice';
import * as styles from './SettingsPage.module.css';
import {useAppDispatch, useAppSelector} from "../../store/store";

// Типы для настроек
interface NetworkSettings {
  port: string;
  protocol: string;
  subnet: string;
  netmask: string;
  dns1: string;
  dns2: string;
}

interface ServerSettings {
  maxClients: string;
  keepalive: string;
  compression: string;
  cipher: string;
  auth: string;
}

const initialNetworkSettings: NetworkSettings = {
  port: '1194',
  protocol: 'udp',
  subnet: '10.8.0.0',
  netmask: '255.255.255.0',
  dns1: '8.8.8.8',
  dns2: '8.8.4.4',
};

const initialServerSettings: ServerSettings = {
  maxClients: '100',
  keepalive: '10 120',
  compression: 'lz4',
  cipher: 'AES-256-GCM',
  auth: 'SHA256',
};

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);
  const [networkSettings, setNetworkSettings] = useState<NetworkSettings>(initialNetworkSettings);
  const [serverSettings, setServerSettings] = useState<ServerSettings>(initialServerSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleThemeChange = (theme: 'light' | 'dark') => dispatch(setTheme(theme));

  const handleSettingChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      settingsType: 'network' | 'server'
  ) => {
    const {name, value} = e.target;
    settingsType === 'network'
        ? setNetworkSettings(prev => ({...prev, [name]: value}))
        : setServerSettings(prev => ({...prev, [name]: value}));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Здесь должна быть реальная логика сохранения
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const renderFormGroup = (
      label: string,
      name: string,
      value: string,
      type: 'text' | 'select',
      options?: string[],
      settingsType: 'network' | 'server' = 'network'
  ) => (
      <div className={styles.formGroup}>
        <label htmlFor={name} className={styles.label}>{label}</label>
        {type === 'text' ? (
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={(e) => handleSettingChange(e, settingsType)}
                className={styles.input}
            />
        ) : (
            <select
                id={name}
                name={name}
                value={value}
                onChange={(e) => handleSettingChange(e, settingsType)}
                className={styles.select}
            >
              {options?.map(option => (
                  <option key={option} value={option}>{option}</option>
              ))}
            </select>
        )}
      </div>
  );

  return (
      <div className={styles.settingsPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <span className={styles.subtitle}>Configure your OpenVPN server</span>
        </div>

        <div className={styles.settingsGrid}>
          <div className={styles.settingsCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Theme Settings</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.themeToggleContainer}>
                <button
                    className={`${styles.themeButton} ${currentTheme === 'light' ? styles.activeTheme : ''}`}
                    onClick={() => handleThemeChange('light')}
                >
                  <FiSun size={20}/>
                  <span>Light Theme</span>
                </button>
                <button
                    className={`${styles.themeButton} ${currentTheme === 'dark' ? styles.activeTheme : ''}`}
                    onClick={() => handleThemeChange('dark')}
                >
                  <FiMoon size={20}/>
                  <span>Dark Theme</span>
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveSettings}>
            <div className={styles.settingsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Network Settings</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.formGrid}>
                  {renderFormGroup('Port', 'port', networkSettings.port, 'text')}
                  {renderFormGroup('Protocol', 'protocol', networkSettings.protocol, 'select', ['udp', 'tcp'])}
                  {renderFormGroup('Subnet', 'subnet', networkSettings.subnet, 'text')}
                  {renderFormGroup('Netmask', 'netmask', networkSettings.netmask, 'text')}
                  {renderFormGroup('Primary DNS', 'dns1', networkSettings.dns1, 'text')}
                  {renderFormGroup('Secondary DNS', 'dns2', networkSettings.dns2, 'text')}
                </div>
              </div>
            </div>

            <div className={styles.settingsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Server Settings</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.formGrid}>
                  {renderFormGroup('Max Clients', 'maxClients', serverSettings.maxClients, 'text', undefined, 'server')}
                  {renderFormGroup('Keepalive', 'keepalive', serverSettings.keepalive, 'text', undefined, 'server')}
                  {renderFormGroup('Compression', 'compression', serverSettings.compression, 'select', ['lz4', 'lzo', 'none'], 'server')}
                  {renderFormGroup('Cipher', 'cipher', serverSettings.cipher, 'select', ['AES-256-GCM', 'AES-128-GCM', 'AES-256-CBC', 'AES-128-CBC'], 'server')}
                  {renderFormGroup('Auth', 'auth', serverSettings.auth, 'select', ['SHA256', 'SHA512', 'SHA1'], 'server')}
                </div>

                <div className={styles.formActions}>
                  <button
                      type="submit"
                      className={styles.saveButton}
                      disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : (
                        <>
                          <FiSave size={18}/>
                          <span>Save Settings</span>
                        </>
                    )}
                  </button>

                  {showSuccess && (
                      <div className={styles.successMessage}>
                        Settings saved successfully!
                      </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default React.memo(SettingsPage);