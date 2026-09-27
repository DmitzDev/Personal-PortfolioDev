import React from 'react';
import * as Icons from 'lucide-react';
import { achievements } from '../../data/certificates';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Achievements.css';

export function Achievements() {
  return (
    <section id="achievements" className="section achievements-section bg-secondary">
      <div className="container">
        <SectionHeader title="Achievements" subtitle="Awards & Honors" />

        <div className="achievements-grid">
          {achievements.map((item, index) => {
            const Icon = Icons[item.icon] || Icons.Award;
            
            return (
              <AnimateOnScroll 
                key={item.id} 
                animation="fade-up" 
                delay={index * 100}
                className="achievement-card glass-card"
              >
                <div className="achievement-icon-box">
                  <Icon size={32} className="achievement-icon" />
                </div>
                
                <div className="achievement-content">
                  <h3 className="achievement-title">{item.title}</h3>
                  <span className="achievement-year">{item.year}</span>
                  <p className="achievement-desc">{item.description}</p>
                </div>
                
                <div className="card-glow-overlay"></div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
