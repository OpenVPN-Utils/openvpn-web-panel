import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FiMoon, FiSave, FiSun} from 'react-icons/fi';
import {selectTheme, setTheme} from '../../store/slices/themeSlice';
import * as styles from './SettingsPage.module.css';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  const [networkSettings, setNetworkSettings] = useState({
    port: '1194',
    protocol: 'udp',
    subnet: '10.8.0.0',
    netmask: '255.255.255.0',
    dns1: '8.8.8.8',
    dns2: '8.8.4.4',
  });

  const [serverSettings, setServerSettings] = useState({
    maxClients: '100',
    keepalive: '10 120',
    compression: 'lz4',
    cipher: 'AES-256-GCM',
    auth: 'SHA256',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    dispatch(setTheme(theme));
  };

  const handleNetworkSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setNetworkSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServerSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setServerSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false);

      // Show success message
      const successMessage = document.getElementById('successMessage');
      if (successMessage) {
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 3000);
      }
    }, 1000);
  };

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
                  <div className={styles.formGroup}>
                    <label htmlFor="port" className={styles.label}>Port</label>
                    <input
                        type="text"
                        id="port"
                        name="port"
                        value={networkSettings.port}
                        onChange={handleNetworkSettingChange}
                        className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="protocol" className={styles.label}>Protocol</label>
                    <select
                        id="protocol"
                        name="protocol"
                        value={networkSettings.protocol}
                        onChange={handleNetworkSettingChange}
                        className={styles.select}
                    >
                      <option value="udp">UDP</option>
                      <option value="tcp">TCP</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subnet" className={styles.label}>Subnet</label>
                    <input
                        type="text"
                        id="subnet"
                        name="subnet"
                        value={networkSettings.subnet}
                        onChange={handleNetworkSettingChange}
                        className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="netmask" className={styles.label}>Netmask</label>
                    <input
                        type="text"
                        id="netmask"
                        name="netmask"
                        value={networkSettings.netmask}
                        onChange={handleNetworkSettingChange}
                        className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="dns1" className={styles.label}>Primary DNS</label>
                    <input
                        type="text"
                        id="dns1"
                        name="dns1"
                        value={networkSettings.dns1}
                        onChange={handleNetworkSettingChange}
                        className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="dns2" className={styles.label}>Secondary DNS</label>
                    <input
                        type="text"
                        id="dns2"
                        name="dns2"
                        value={networkSettings.dns2}
                        onChange={handleNetworkSettingChange}
                        className={styles.input}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.settingsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Server Settings</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="maxClients" className={styles.label}>Max Clients</label>
                    <input
                        type="text"
                        id="maxClients"
                        name="maxClients"
                        value={serverSettings.maxClients}
                        onChange={handleServerSettingChange}
                        className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="keepalive" className={styles.label}>Keepalive (ping interval/timeout)</label>
                    <input
                        type="text"
                        id="keepalive"
                        name="keepalive"
                        value={serverSettings.keepalive}
                        onChange={handleServerSettingChange}
                        className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="compression" className={styles.label}>Compression</label>
                    <select
                        id="compression"
                        name="compression"
                        value={serverSettings.compression}
                        onChange={handleServerSettingChange}
                        className={styles.select}
                    >
                      <option value="lz4">LZ4</option>
                      <option value="lzo">LZO</option>
                      <option value="none">None</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="cipher" className={styles.label}>Cipher</label>
                    <select
                        id="cipher"
                        name="cipher"
                        value={serverSettings.cipher}
                        onChange={handleServerSettingChange}
                        className={styles.select}
                    >
                      <option value="AES-256-GCM">AES-256-GCM</option>
                      <option value="AES-128-GCM">AES-128-GCM</option>
                      <option value="AES-256-CBC">AES-256-CBC</option>
                      <option value="AES-128-CBC">AES-128-CBC</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="auth" className={styles.label}>Auth</label>
                    <select
                        id="auth"
                        name="auth"
                        value={serverSettings.auth}
                        onChange={handleServerSettingChange}
                        className={styles.select}
                    >
                      <option value="SHA256">SHA256</option>
                      <option value="SHA512">SHA512</option>
                      <option value="SHA1">SHA1</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                      type="submit"
                      className={styles.saveButton}
                      disabled={isSaving}
                  >
                    {isSaving ? (
                        'Saving...'
                    ) : (
                        <>
                          <FiSave size={18}/>
                          <span>Save Settings</span>
                        </>
                    )}
                  </button>

                  <div
                      id="successMessage"
                      className={styles.successMessage}
                      style={{display: 'none'}}
                  >
                    Settings saved successfully!
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default SettingsPage;