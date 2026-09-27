import React, { useEffect, useState } from 'react';
import './Shared.css';
import { personalInfo } from '../../data/personalInfo';

export function Loader({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Ultra-snappy transition so clients experience instantaneous FCP
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 200);
    }, 300);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loader-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo-container">
          <img src={personalInfo.logoImage} alt="Logo" className="loader-logo-img" />
          <h1 className="loader-logo-text">{personalInfo.logoText}</h1>
        </div>
        <div className="loader-progress"></div>
      </div>
    </div>
  );
}
