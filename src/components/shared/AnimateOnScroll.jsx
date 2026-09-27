import React, { useEffect, useRef, useState } from 'react';
import './Shared.css';

export function AnimateOnScroll({ children, animation = 'fade-up', delay = 0, threshold = 0.1, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0';
  
  return (
    <div 
      ref={ref} 
      className={`${animationClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
