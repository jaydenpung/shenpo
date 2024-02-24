'use client';

import styles from './page.module.css';
import Calendly from './components/Calendly';
import Galaxy from './components/Galaxy';

export default function Home() {
  return (
    <div>
      {/* Calendly */}
      <div className={styles.calendlyContainer}>
        <Calendly />
      </div>

      {/* Galaxy */}
      <div className={styles.galaxyContainer}>
        <Galaxy />
      </div>

      {/* Text */}
      <div className={styles.heading}>
        <h1>神婆の占卦</h1>
        <h4>Plan your life based on your energy field</h4>
      </div>
    </div>
  );
}
