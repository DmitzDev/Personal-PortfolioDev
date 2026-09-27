import React, { useState } from 'react';
import { ExternalLink, Code2, Search, X } from 'lucide-react';
import { projects, projectCategories } from '../../data/projects';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Projects.css';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category.includes(activeCategory);

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.shortDescription.toLowerCase().includes(query) ||
      project.category.some(cat => cat.toLowerCase().includes(query)) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionHeader title="Featured Projects" subtitle="My Portfolio" />

        <div className="projects-controls">
          <AnimateOnScroll className="projects-filter">
            {projectCategories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </AnimateOnScroll>

          <AnimateOnScroll className="projects-search glass-card">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </AnimateOnScroll>
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <AnimateOnScroll
                key={project.id}
                animation="fade-up"
                delay={index * 100}
                className="project-card glass-card"
              >
                <div
                  className="project-image-container"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="project-image" />
                  ) : (
                    <div className="project-image-placeholder">
                      <span>{project.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="project-overlay">
                    <span className="view-details">View Details</span>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-date">{project.date}</span>
                    <span className={`project-status ${project.status === 'Completed' ? 'status-completed' : 'status-progress'}`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.shortDescription}</p>

                  <div className="project-tech">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-tag">+{project.technologies.length - 4} more</span>
                    )}
                  </div>

                  <div className="project-actions">
                    <a href={project.liveDemo} className="btn-icon" target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                    <a href={project.github} className="btn-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <Code2 size={20} />
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))
          ) : (
            <div className="no-results">
              <p>No projects found matching your criteria.</p>
              <button className="btn-secondary mt-4" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>

            <div className="modal-hero">
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} className="modal-hero-image" />
              ) : (
                <div className="modal-hero-placeholder">
                  <span>{selectedProject.title.charAt(0)}</span>
                </div>
              )}
              <div className="modal-hero-overlay">
                <h2 className="modal-title">{selectedProject.title}</h2>
                <div className="project-meta">
                  <span className="project-date">{selectedProject.date}</span>
                  <span className={`project-status ${selectedProject.status === 'Completed' ? 'status-completed' : 'status-progress'}`}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-info-main">
                <h3>Overview</h3>
                <p>{selectedProject.description}</p>

                <h3>Key Features</h3>
                <ul className="feature-list">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-info-sidebar">
                <h3>Technologies</h3>
                <div className="project-tech">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  <a href={selectedProject.liveDemo} className="btn-primary" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} className="mr-2" /> Live Demo
                  </a>
                  <a href={selectedProject.github} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                    <Code2 size={18} className="mr-2" /> Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
