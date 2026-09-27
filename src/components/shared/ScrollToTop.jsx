import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './Shared.css';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
      <ArrowUp size={20} />
    </button>
  );
}
