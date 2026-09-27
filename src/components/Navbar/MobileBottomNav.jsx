import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Plus, Briefcase, Code2, Download, Phone, Award, Heart, LayoutDashboard } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './MobileBottomNav.css';

export function MobileBottomNav({ activeSection, scrollTo }) {
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close popup menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking the plus button itself (let its onClick handle the toggle)
      if (event.target.closest('.fab-button')) return;

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsPlusMenuOpen(false);
      }
    };
    
    if (isPlusMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isPlusMenuOpen]);

  const handleNavClick = (id) => {
    scrollTo(id);
    setIsPlusMenuOpen(false);
  };

  return (
    <div className="mobile-bottom-nav-container">
      {/* Popup Menu for Plus Button (Rainbow Radial Layout) */}
      <div 
        ref={menuRef}
        className={`fab-popup-menu ${isPlusMenuOpen ? 'open' : ''}`}
      >
        <button 
          className="fab-popup-item" 
          style={{ '--tx': '-75px', '--ty': '-60px', '--delay': '0.05s' }}
          onClick={() => handleNavClick('skills')}
          aria-label="Skills"
        >
          <Code2 size={24} />
        </button>
        <button 
          className="fab-popup-item" 
          style={{ '--tx': '-30px', '--ty': '-100px', '--delay': '0.1s' }}
          onClick={() => handleNavClick('projects')}
          aria-label="Projects"
        >
          <LayoutDashboard size={24} />
        </button>
        <button 
          className="fab-popup-item" 
          style={{ '--tx': '30px', '--ty': '-100px', '--delay': '0.15s' }}
          onClick={() => handleNavClick('experience')}
          aria-label="Experience"
        >
          <Briefcase size={24} />
        </button>
        <a 
          href={personalInfo.resumeUrl} 
          className="fab-popup-item" 
          style={{ '--tx': '75px', '--ty': '-60px', '--delay': '0.2s' }}
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => setIsPlusMenuOpen(false)}
          aria-label="Download Resume"
        >
          <Download size={24} />
        </a>
      </div>

      {/* Main Bottom Navbar */}
      <nav className="mobile-bottom-nav glass-card">
        <ul className="nav-items-left">
          <li>
            <button 
              className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => handleNavClick('hero')}
            >
              <Home size={24} />
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              <User size={24} />
            </button>
          </li>
        </ul>

        {/* Center Cutout & FAB */}
        <div className="nav-center-cutout">
          <button 
            className={`fab-button ${isPlusMenuOpen ? 'active' : ''}`}
            onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
            aria-label="Toggle menu"
          >
            <Plus size={32} className={`fab-icon ${isPlusMenuOpen ? 'rotate' : ''}`} />
          </button>
        </div>

        <ul className="nav-items-right">
          <li>
            <button 
              className={`nav-item ${activeSection === 'services' ? 'active' : ''}`}
              onClick={() => handleNavClick('services')}
            >
              <Heart size={24} />
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              <Phone size={24} />
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeSection === 'certificates' ? 'active' : ''}`}
              onClick={() => handleNavClick('certificates')}
            >
              <Award size={24} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
