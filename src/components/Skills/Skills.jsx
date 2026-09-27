import React, { useState, useRef } from 'react';
import { Rocket } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { skills, skillCategories } from '../../data/skills';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import { useTheme } from '../../hooks/useTheme';
import './Skills.css';

const getProficiency = (percentage) => {
  if (percentage >= 85) return "Advanced";
  if (percentage >= 70) return "Intermediate";
  if (percentage >= 40) return "Familiar";
  if (percentage > 0) return "Beginner";
  return "Learning";
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const calendarRef = useRef(null);
  const { theme } = useTheme();

  // Drag to scroll logic
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - calendarRef.current.offsetLeft);
    setScrollLeft(calendarRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setDragMoved(true);
    const x = e.pageX - calendarRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    calendarRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleLinkClick = (e) => {
    if (dragMoved) {
      e.preventDefault();
    }
  };

  const scrollCalendar = (direction) => {
    if (calendarRef.current) {
      const scrollAmount = 350;
      calendarRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeader title="My Skills" subtitle="Technical Expertise" />

        <AnimateOnScroll className="skills-filter">
          {skillCategories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </AnimateOnScroll>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <AnimateOnScroll
              key={skill.name}
              animation="fade-up"
              delay={index * 50}
              className="skill-card glass-card"
            >
              <div className="skill-content">
                <div className="skill-header">
                  {skill.icon === 'antigravity' ? (
                    <Rocket size={24} className="skill-icon" color="var(--accent)" />
                  ) : (
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                      alt={skill.name}
                      className="skill-icon"
                      onError={(e) => {
                        e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-plain.svg`;
                      }}
                    />
                  )}
                  <h4 className="skill-name">{skill.name}</h4>
                </div>
                <span className={`skill-level level-${getProficiency(skill.percentage).toLowerCase()}`}>
                  {getProficiency(skill.percentage)}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="github-contributions-section" animation="fade-up" delay={200}>
          <div className="github-contributions-header">
            <div className="github-title-wrapper">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
                className="github-title-icon"
              />
              <h3>GitHub Contributions</h3>
            </div>
            <p>Live sync of my coding activity and commits</p>
          </div>

          <div className="github-calendar-container">
            <button className="calendar-scroll-btn left" onClick={() => scrollCalendar('left')} aria-label="Scroll left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <div
              className={`github-calendar-wrapper glass-card ${isDragging ? 'dragging' : ''}`}
              ref={calendarRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="glow-effect"></div>
              <a
                href="https://github.com/DmitzDev"
                target="_blank"
                rel="noopener noreferrer"
                className="github-calendar-link"
                onClick={handleLinkClick}
              >
                <GitHubCalendar
                  username="DmitzDev"
                  colorScheme={theme === 'dark' ? 'dark' : 'light'}
                  blockSize={14}
                  blockMargin={6}
                  fontSize={14}
                  theme={{
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
                  }}
                />
              </a>
            </div>

            <button className="calendar-scroll-btn right" onClick={() => scrollCalendar('right')} aria-label="Scroll right">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
