import React from 'react';
import * as Icons from 'lucide-react';
import { services } from '../../data/services';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Services.css';

export function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <SectionHeader title="My Services" subtitle="What I Do" />

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = Icons[service.icon] || Icons.Code;
            
            return (
              <AnimateOnScroll 
                key={service.id} 
                animation="fade-up" 
                delay={index * 100}
                className="service-card glass-card"
              >
                <div className="service-icon-wrapper">
                  <div className="service-icon-bg"></div>
                  <Icon size={32} className="service-icon" />
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-glow"></div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
