import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import './Shared.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`pro-theme-switch ${isDark ? 'dark' : 'light'}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="pro-switch-track">
        <span className="track-icon-slot sun-slot" aria-hidden="true">
          <Sun size={12} />
        </span>
        <span className="track-icon-slot moon-slot" aria-hidden="true">
          <Moon size={12} />
        </span>
        <span className="pro-switch-thumb">
          {isDark ? (
            <Moon size={12} className="active-thumb-icon moon" />
          ) : (
            <Sun size={12} className="active-thumb-icon sun" />
          )}
        </span>
      </span>
    </button>
  );
}
