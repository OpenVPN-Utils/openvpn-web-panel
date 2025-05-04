import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {FiActivity, FiHome, FiMenu, FiSettings, FiUsers, FiX} from 'react-icons/fi';
import * as styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
      <>
        <div className={`${styles.mobileToggle} ${isOpen ? styles.active : ''}`}>
          <button onClick={toggleSidebar} aria-label="Toggle menu">
            {isOpen ? <FiX size={24}/> : <FiMenu size={24}/>}
          </button>
        </div>

        <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
          <div className={styles.logo}>
            <span className={styles.logoText}>OpenVPN Admin</span>
          </div>

          <div className={styles.nav}>
            <NavLink
                to="/dashboard"
                className={({isActive}) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                onClick={closeSidebar}
            >
              <FiHome className={styles.icon}/>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
                to="/clients"
                className={({isActive}) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                onClick={closeSidebar}
            >
              <FiUsers className={styles.icon}/>
              <span>Clients</span>
            </NavLink>

            <NavLink
                to="/network"
                className={({isActive}) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                onClick={closeSidebar}
            >
              <FiActivity className={styles.icon}/>
              <span>Network</span>
            </NavLink>

            <NavLink
                to="/settings"
                className={({isActive}) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                onClick={closeSidebar}
            >
              <FiSettings className={styles.icon}/>
              <span>Settings</span>
            </NavLink>
          </div>

          <div className={styles.footer}>
            <p className={styles.version}>v1.0.0</p>
          </div>
        </nav>

        {isOpen && (
            <div className={styles.overlay} onClick={closeSidebar}/>
        )}
      </>
  );
};

export default Sidebar;