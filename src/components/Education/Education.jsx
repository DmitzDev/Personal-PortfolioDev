import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { education } from '../../data/education';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Education.css';

export function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <SectionHeader title="Education" subtitle="Academic Background" />

        <div className="education-grid">
          {education.map((edu, index) => (
            <AnimateOnScroll 
              key={edu.id} 
              animation="fade-up" 
              delay={index * 100}
              className="education-card glass-card"
            >
              <div className="edu-icon-wrapper">
                <GraduationCap size={28} className="edu-icon" />
              </div>
              
              <div className="edu-content">
                <div className="edu-header">
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <span className="edu-year">{edu.year}</span>
                </div>
                
                <h4 className="edu-school text-gradient">{edu.school}</h4>
                <p className="edu-description">{edu.description}</p>
                
                {((edu.awards && edu.awards.length > 0) || edu.gpa) && (
                  <div className="edu-footer">
                    {edu.awards && edu.awards.length > 0 && (
                      <div className="edu-awards">
                        <Award size={16} />
                        <span>{edu.awards.join(', ')}</span>
                      </div>
                    )}
                    {edu.gpa && (
                      <div className="edu-gpa">
                        GPA: <strong>{edu.gpa}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
