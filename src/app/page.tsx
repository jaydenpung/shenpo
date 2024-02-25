'use client';

import styles from './page.module.css';
import Calendly from './components/Calendly';
import Galaxy from './components/Galaxy';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [beenHere, setBeenHere] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    localStorage.getItem('beenHere') ? setBeenHere(true) : setBeenHere(false);

    setTimeout(() => {
      setBeenHere(true);
      localStorage.setItem('beenHere', 'true');
    }, 4800);
  }, []);
  return (
    <div ref={ref}>
      {/* Calendly */}
      <div className={styles.calendlyContainer}>
        <Calendly rootRef={ref} />
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

      {!beenHere && (
        <div className={styles.dragGesture}>
          <Image alt="drag-left" src="/drag.gif" width="80" height="80" />
        </div>
      )}
    </div>
  );
}
