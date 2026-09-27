import React from 'react';
import { Download, FileText } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Resume.css';

export function Resume() {
  return (
    <section id="resume" className="section resume-section bg-secondary">
      <div className="container">
        <SectionHeader title="Resume" subtitle="My Curriculum Vitae" />

        <div className="resume-content">
          <AnimateOnScroll className="resume-actions glass-card text-center">
            <h3 className="resume-prompt">Want to know more about my professional background?</h3>
            <p className="resume-desc">You can view my full resume below or download it for offline reading.</p>

            <a
              href={personalInfo.resumeUrl}
              className="btn-primary resume-download-btn"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Download size={20} className="mr-2" /> Download Resume (PDF)
            </a>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200} className="resume-viewer-container glass-card">
            <div className="viewer-header">
              <FileText size={20} />
              <span>Resume.pdf</span>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="pdf-viewer">
              <object
                data={personalInfo.resumeUrl}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <div className="pdf-fallback">
                  <p>Your browser does not support PDFs.</p>
                  <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">Download the PDF instead.</a>
                </div>
              </object>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
