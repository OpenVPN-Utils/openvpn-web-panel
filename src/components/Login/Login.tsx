import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FiLock, FiMoon, FiSun, FiUser} from 'react-icons/fi';
import {clearError, login, selectAuth} from '../../store/slices/authSlice';
import {selectTheme, toggleTheme} from '../../store/slices/themeSlice';
import * as styles from './Login.module.css';
import {useAppDispatch, useAppSelector} from "../../store/store";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {isAuthenticated, loading, error} = useAppSelector(selectAuth);
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({username, password}) as any);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
      <div className={styles.loginContainer}>
        <div className={styles.themeToggle}>
          <button
              onClick={handleThemeToggle}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <FiMoon size={20}/> : <FiSun size={20}/>}
          </button>
        </div>

        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1 className={styles.title}>OpenVPN Admin</h1>
            <p className={styles.subtitle}>Login to manage your VPN server</p>
          </div>

          {error && (
              <div className={styles.errorMessage}>
                {error}
                <button
                    onClick={() => dispatch(clearError())}
                    className={styles.dismissError}
                >
                  ×
                </button>
              </div>
          )}

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.inputLabel}>
                Username
              </label>
              <div className={styles.inputWrapper}>
                <FiUser className={styles.inputIcon}/>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className={styles.input}
                    required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon}/>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={styles.input}
                    required
                />
              </div>
            </div>

            <button
                type="submit"
                className={styles.loginButton}
                disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className={styles.loginFooter}>
            <p className={styles.hint}>
              Demo credentials: admin / password
            </p>
          </div>
        </div>
      </div>
  );
};

export default Login;