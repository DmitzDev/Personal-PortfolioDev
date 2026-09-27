import React from 'react';
import { Briefcase } from 'lucide-react';
import { experience } from '../../data/experience';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Experience.css';

export function Experience() {
  return (
    <section id="experience" className="section experience-section bg-secondary">
      <div className="container">
        <SectionHeader title="Work Experience" subtitle="My Professional Journey" />

        <div className="timeline">
          {experience.map((exp, index) => (
            <AnimateOnScroll 
              key={exp.id} 
              animation={index % 2 === 0 ? "fade-right" : "fade-left"}
              delay={index * 150}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-dot">
                <div className="dot-glow"></div>
                <Briefcase size={20} className="dot-icon" />
              </div>
              
              <div className="timeline-content glass-card">
                <span className="exp-type">{exp.type}</span>
                <span className="exp-duration">{exp.duration}</span>
                <h3 className="exp-position">{exp.position}</h3>
                <h4 className="exp-company text-gradient">{exp.company}</h4>
                
                <ul className="exp-responsibilities">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
