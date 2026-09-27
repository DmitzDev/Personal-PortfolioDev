import React from 'react';
import { Home, LayoutDashboard, Code2, Award, MessageSquare } from 'lucide-react';
import './MobileBottomNav.css';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: LayoutDashboard },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'experience', label: 'Experience', icon: Award },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

export function MobileBottomNav({ activeSection, scrollTo }) {
  const handleNavClick = (id) => {
    scrollTo(id);
  };

  return (
    <div className="mobile-bottom-nav-container">
      <nav className="mobile-dock-nav" aria-label="Mobile Navigation">
        <ul className="mobile-dock-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="mobile-dock-item">
                <button
                  type="button"
                  className={`dock-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-label={item.label}
                >
                  <span className="dock-icon-wrapper">
                    <Icon size={19} className="dock-icon" />
                    {isActive && <span className="dock-active-dot" />}
                  </span>
                  <span className="dock-label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
