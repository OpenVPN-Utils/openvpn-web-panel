import React from 'react';
import {FiLogOut, FiMoon, FiSun} from 'react-icons/fi';
import {selectTheme, toggleTheme} from '../../store/slices/themeSlice';
import {logout, selectAuth} from '../../store/slices/authSlice';
import * as styles from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../store/store";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const {user} = useAppSelector(selectAuth);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
      <header className={styles.header}>
        <div className={styles.title}>OpenVPN Dashboard</div>
        <div className={styles.actions}>
          <button
              className={styles.themeToggle}
              onClick={handleThemeToggle}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <FiMoon size={20}/> : <FiSun size={20}/>}
          </button>

          <div className={styles.userInfo}>
            <span>Hello, {user}</span>
            <button
                className={styles.logoutButton}
                onClick={handleLogout}
                aria-label="Logout"
            >
              <FiLogOut size={18}/>
              <span className={styles.logoutText}>Logout</span>
            </button>
          </div>
        </div>
      </header>
  );
};

export default Header;