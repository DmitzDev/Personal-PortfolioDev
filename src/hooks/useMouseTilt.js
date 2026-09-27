import { useState, useEffect, useRef } from 'react';

export function useMouseTilt(maxTilt = 15) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt based on distance from center
      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
        transition: 'transform 0.1s ease-out'
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`,
        transition: 'transform 0.5s ease-out'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return { ref, style };
}
