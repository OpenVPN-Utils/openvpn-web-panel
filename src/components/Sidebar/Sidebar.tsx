import React, {memo, useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {FiActivity, FiHome, FiMenu, FiSettings, FiUsers, FiX} from 'react-icons/fi';
import * as styles from './Sidebar.module.css';

interface MenuItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const menuItems: MenuItem[] = [
  {to: "/dashboard", icon: <FiHome className={styles.icon}/>, label: "Dashboard"},
  {to: "/clients", icon: <FiUsers className={styles.icon}/>, label: "Clients"},
  {to: "/network", icon: <FiActivity className={styles.icon}/>, label: "Network"},
  {to: "/settings", icon: <FiSettings className={styles.icon}/>, label: "Settings"},
];

const NavItem = memo(({item, closeSidebar}: { item: MenuItem; closeSidebar: () => void }) => {
  return (
      <NavLink
          to={item.to}
          className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={closeSidebar}
          end
      >
        {item.icon}
        <span>{item.label}</span>
      </NavLink>
  )
});

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

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
            {menuItems.map((item) => (
                <NavItem key={item.to} item={item} closeSidebar={closeSidebar}/>
            ))}
          </div>

          <div className={styles.footer}>
            <p className={styles.version}>v1.0.0</p>
          </div>
        </nav>

        {isOpen && <div className={styles.overlay} onClick={closeSidebar}/>}
      </>
  );
};

export default memo(Sidebar);