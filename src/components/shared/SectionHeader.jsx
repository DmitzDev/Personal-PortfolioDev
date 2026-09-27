import React from 'react';
import './Shared.css';

export function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      {subtitle && <h3 className="section-subtitle">{subtitle}</h3>}
      <h2 className="section-title">{title}</h2>
    </div>
  );
}
