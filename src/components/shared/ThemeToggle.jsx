import React from 'react';
import { Sun, Moon, Cloud, Star } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button 
      onClick={toggleTheme} 
      className={`premium-theme-toggle ${isDark ? 'dark' : 'light'}`}
      aria-label="Toggle theme"
    >
      <div className="toggle-track">
        {/* Background Decorative Elements */}
        <div className="toggle-bg">
          {isDark ? (
            <div className="stars">
              <Star size={8} className="star star-1" fill="white" />
              <Star size={6} className="star star-2" fill="white" />
              <Star size={10} className="star star-3" fill="white" />
            </div>
          ) : (
            <div className="clouds">
              <Cloud size={14} className="cloud cloud-1" fill="white" color="white" />
              <Cloud size={10} className="cloud cloud-2" fill="white" color="white" />
            </div>
          )}
        </div>
        
        {/* Sliding Thumb */}
        <div className="toggle-thumb">
          {isDark ? (
            <Moon size={16} color="#fbbf24" fill="#fbbf24" className="thumb-icon moon-icon" />
          ) : (
            <Sun size={16} color="#f59e0b" fill="#f59e0b" className="thumb-icon sun-icon" />
          )}
        </div>
      </div>
    </button>
  );
}
