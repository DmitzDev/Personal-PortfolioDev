import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentActive = sectionIds[0];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentActive = id;
          }
        }
      }

      // Special case for reaching the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        currentActive = sectionIds[sectionIds.length - 1];
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
