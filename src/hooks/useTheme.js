import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 
           localStorage.getItem('theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const handleThemeChange = (e) => {
      setTheme(e.detail);
    };

    window.addEventListener('theme-changed', handleThemeChange);
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: newTheme }));
  };

  return { theme, toggleTheme };
}
