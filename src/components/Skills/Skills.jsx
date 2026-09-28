import React, { useState } from 'react';
import { skills, skillCategories } from '../../data/skills';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../../hooks/useTheme';
import { Terminal } from 'lucide-react';
import './Skills.css';

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { theme } = useTheme();

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">TECHNICAL ARCHITECTURE</div>
          <h2 className="section-title">Core Engineering Capabilities</h2>
          <p className="section-subtitle">
            Focused on modern front-end development, responsive component architecture, and high-performance cloud databases.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills-tabs-container">
          {skillCategories.map(category => (
            <button
              key={category}
              className={`skill-tab-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <AnimateOnScroll
              key={skill.name}
              animation="fade-up"
              delay={(index % 6) * 60}
              className="skill-card glass-card"
            >
              <div className="skill-card-top">
                <div className="skill-icon-wrap">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                    alt={skill.name}
                    className="skill-devicon"
                    onError={(e) => {
                      e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-plain.svg`;
                    }}
                  />
                </div>
                <div className="skill-meta-wrap">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-level-badge">{skill.badge || skill.level}</span>
                </div>
              </div>

              <p className="skill-description">{skill.description}</p>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Continuous Tech Stack Marquee */}
        <div className="skills-ticker-wrapper glass-card">
          <div className="ticker-label">
            <Terminal size={14} />
            <span>PRODUCTION ARSENAL:</span>
          </div>
          <div className="ticker-track-container">
            <div className="ticker-track">
              {[...skills, ...skills].map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="ticker-item">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.icon}/${item.icon}-original.svg`}
                    alt={item.name}
                    className="ticker-icon"
                    onError={(e) => {
                      e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.icon}/${item.icon}-plain.svg`;
                    }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verified GitHub Activity */}
        <div className="github-activity-card glass-card">
          <div className="github-card-header">
            <div className="github-header-left">
              <span className="live-status-dot"></span>
              <h4>Live GitHub Contribution Activity</h4>
            </div>
            <a
              href="https://github.com/DmitzDev"
              target="_blank"
              rel="noopener noreferrer"
              className="github-profile-link"
            >
              @DmitzDev on GitHub ↗
            </a>
          </div>

          <div className="github-calendar-scroll">
            <GitHubCalendar
              username="DmitzDev"
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              fontSize={12}
              blockSize={13}
              blockMargin={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
