'use client';

import styles from './page.module.css';
import Calendly from './components/Calendly';

export default function Home() {
  return (
    <div className={styles.center}>
      {/* Calendly */}
      <Calendly />
    </div>
  );
}
