import React, { useEffect, useState } from 'react';
import './Shared.css';
import { personalInfo } from '../../data/personalInfo';

export function Loader({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); // 500ms match fade-out CSS animation duration
    }, 2000); // Loader displays for 2s

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
