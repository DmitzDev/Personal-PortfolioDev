import React, { useState, useEffect } from 'react';
import { personalInfo } from '../../data/personalInfo';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import { useTheme } from '../../hooks/useTheme';
import './Hero.css';

import { useMouseTilt } from '../../hooks/useMouseTilt';
import shadeImage from '../../assets/Shade.png';
import uddLogo from '../../assets/UDDlogo.jpg';
import soeLogo from '../../assets/SOE.jpg';
import cessLogo from '../../assets/Cess.jpg';

export function Hero() {
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [showShades, setShowShades] = useState(false);
  const tilt = useMouseTilt(15);

  // Typing effect logic
  useEffect(() => {
    const handleTyping = () => {
      const currentRole = personalInfo.roles[roleIndex];

      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(50); // Faster when deleting
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(100); // Normal typing speed
      }

      if (!isDeleting && displayText === currentRole) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="mesh-overlay"></div>
      </div>

      <div className="container hero-container">
        {/* Mobile ONLY: Badge Text */}
        <div className="mobile-only-badge">
          <div className="hero-badge glass-card">
            <span className="typing-text">{displayText}</span><span className="cursor">|</span>
          </div>
        </div>

        <AnimateOnScroll animation="fade-up" delay={100} className="hero-content">
          {/* Desktop ONLY: Badge and Logos */}
          <div className="hero-badge-container desktop-only-badge">
            <div className="hero-badge glass-card">
              <span className="typing-text">{displayText}</span><span className="cursor">|</span>
            </div>
            <div className="hero-logos">
              <img src={uddLogo} alt="UDD" className="hero-logo" />
              <img src={soeLogo} alt="SOE" className="hero-logo" />
              <img src={cessLogo} alt="CESS" className="hero-logo" />
            </div>
          </div>

          <h1 className="hero-title">
            I Am <span className="text-gradient">MitchDev.</span><br />
            I build digital<br />
            experiences.
          </h1>

          <p className="hero-description">
            {personalInfo.bio}
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-secondary glass-card">Get in Touch</a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={300} className="hero-image-wrapper">
          <div
            className="image-container"
            ref={tilt.ref}
            style={{ ...tilt.style, transformStyle: 'preserve-3d' }}
            onMouseEnter={() => setShowShades(true)}
            onMouseLeave={() => setShowShades(false)}
            onTouchStart={() => setShowShades(!showShades)}
          >
            <div className="image-glow"></div>
            <div className="portraits-wrapper">
              <img
                src="/Mitch.png"
                alt={personalInfo.name}
                className={`portrait-image smooth-image ${theme === 'dark' ? 'visible' : 'hidden'}`}
              />
              <img
                src="/MitchSmile.png"
                alt={personalInfo.name}
                className={`portrait-image smooth-image ${theme === 'light' ? 'visible' : 'hidden'}`}
              />
            </div>

            <img
              src={shadeImage}
              alt="Shades"
              className={`shades-image ${showShades ? 'visible' : ''}`}
            />
          </div>

          {/* Mobile ONLY: Logos Below Image */}
          <div className="hero-logos mobile-only-logos">
            <img src={uddLogo} alt="UDD" className="hero-logo" />
            <img src={soeLogo} alt="SOE" className="hero-logo" />
            <img src={cessLogo} alt="CESS" className="hero-logo" />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
