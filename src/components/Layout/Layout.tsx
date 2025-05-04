import React from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import * as styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
      <div className={styles.layout}>
        <Sidebar/>
        <div className={styles.content}>
          <Header/>
          <main className={styles.main}>
            <Outlet/>
          </main>
        </div>
      </div>
  );
};

export default Layout;