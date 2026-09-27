import React, { useState, useEffect } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import './Statistics.css';

const StatItem = ({ label, value, suffix = '' }) => {
  const { count, ref } = useCountUp(value, 2500, true);
  
  return (
    <div className="stat-item glass-card" ref={ref}>
      <div className="stat-value text-gradient">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export function Statistics() {
  const [repoCount, setRepoCount] = useState(0);

  useEffect(() => {
    fetch('https://api.github.com/users/DmitzDev')
      .then(res => res.json())
      .then(data => {
        if (data && data.public_repos !== undefined) {
          setRepoCount(data.public_repos);
        } else {
          setRepoCount(15); // Fallback if API limit reached or error
        }
      })
      .catch(err => {
        console.error("Failed to fetch GitHub repo count", err);
        setRepoCount(15);
      });
  }, []);

  return (
    <section className="statistics-section">
      <div className="container">
        <div className="stats-grid">
          <StatItem label="Projects Completed" value={repoCount} suffix="" />
          <StatItem label="Years Experience" value={4} suffix="+" />
          <StatItem label="Technologies" value={20} suffix="+" />
          <StatItem label="Happy Clients" value={10} suffix="+" />
        </div>
      </div>
    </section>
  );
}
