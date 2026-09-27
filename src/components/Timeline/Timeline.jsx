import React from 'react';
import { Flag, Rocket, Briefcase, GraduationCap, Award, Star } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Timeline.css';

const milestones = [
  { id: 1, year: '2020', title: 'Started Programming', description: 'Wrote my first "Hello World" in HTML/CSS and discovered a passion for web development.', icon: Flag },
  { id: 2, year: '2022', title: 'First Project', description: 'Built and deployed my first junior application using PHP and MySQL.', icon: Rocket },
  { id: 3, year: '2023', title: 'Freelance Journey', description: 'Started taking freelance clients and building real-world projects for small businesses.', icon: Briefcase },
  { id: 4, year: '2024', title: 'Internship', description: 'Joined Tech Solutions Inc. as a Web Development Intern, gaining enterprise experience.', icon: Star },
  { id: 5, year: '2025', title: 'Certifications', description: 'Earned multiple professional certifications in React, Python, and UI/UX Design.', icon: Award },
  { id: 6, year: '2026', title: 'Graduation', description: 'Graduating with a degree in Information Technology, ready to make an impact.', icon: GraduationCap },
];

export function Timeline() {
  return (
    <section id="timeline" className="section timeline-section">
      <div className="container">
        <SectionHeader title="My Journey" subtitle="Career Milestones" />

        <div className="milestones-container">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;
            
            return (
              <AnimateOnScroll 
                key={milestone.id} 
                animation={isLeft ? "fade-right" : "fade-left"} 
                delay={index * 100}
                className={`milestone-item ${isLeft ? 'left' : 'right'}`}
              >
                <div className="milestone-content glass-card">
                  <div className="milestone-year text-gradient">{milestone.year}</div>
                  <h3 className="milestone-title">{milestone.title}</h3>
                  <p className="milestone-description">{milestone.description}</p>
                </div>
                
                <div className="milestone-icon-wrapper">
                  <div className="icon-glow"></div>
                  <Icon size={24} className="milestone-icon" />
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
