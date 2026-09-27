import React, { useState, useEffect, useRef } from 'react';
import { Home, LayoutDashboard, Plus, Briefcase, Code2, Download, MessageSquare, Award } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './MobileBottomNav.css';

export function MobileBottomNav({ activeSection, scrollTo }) {
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close popup menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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
      {/* Popup Menu for Plus Button */}
      <div
        ref={menuRef}
        className={`fab-popup-menu ${isPlusMenuOpen ? 'open' : ''}`}
      >
        <button
          className="fab-popup-item"
          style={{ '--tx': '-60px', '--ty': '-70px', '--delay': '0.05s' }}
          onClick={() => handleNavClick('skills')}
          aria-label="Capabilities"
        >
          <Code2 size={22} />
        </button>
        <button
          className="fab-popup-item"
          style={{ '--tx': '0px', '--ty': '-95px', '--delay': '0.1s' }}
          onClick={() => handleNavClick('services')}
          aria-label="Services"
        >
          <Briefcase size={22} />
        </button>
        <a
          href={personalInfo.resumeUrl}
          className="fab-popup-item"
          style={{ '--tx': '60px', '--ty': '-70px', '--delay': '0.15s' }}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsPlusMenuOpen(false)}
          aria-label="Download Resume"
        >
          <Download size={22} />
        </a>
      </div>

      {/* Main Bottom Navbar */}
      <nav className="mobile-bottom-nav glass-card">
        <ul className="nav-items-left">
          <li>
            <button
              className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => handleNavClick('hero')}
              aria-label="Overview"
            >
              <Home size={22} />
            </button>
          </li>
          <li>
            <button
              className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => handleNavClick('projects')}
              aria-label="Case Studies"
            >
              <LayoutDashboard size={22} />
            </button>
          </li>
        </ul>

        {/* Center Cutout & FAB */}
        <div className="nav-center-cutout">
          <button
            className={`fab-button ${isPlusMenuOpen ? 'active' : ''}`}
            onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
            aria-label="Toggle quick actions"
          >
            <Plus size={28} className={`fab-icon ${isPlusMenuOpen ? 'rotate' : ''}`} />
          </button>
        </div>

        <ul className="nav-items-right">
          <li>
            <button
              className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => handleNavClick('experience')}
              aria-label="Experience & Credentials"
            >
              <Award size={22} />
            </button>
          </li>
          <li>
            <button
              className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
              aria-label="Contact"
            >
              <MessageSquare size={22} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
