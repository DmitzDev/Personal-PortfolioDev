import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Testimonials.css';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const setSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section testimonials-section bg-secondary">
      <div className="container">
        <SectionHeader title="Testimonials" subtitle="Client Feedback" />

        <AnimateOnScroll className="testimonials-carousel-wrapper">
          <div className="testimonials-carousel glass-card">
            <Quote size={48} className="quote-icon" />
            
            <div className={`carousel-content ${isAnimating ? 'animating' : ''}`}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < currentTestimonial.rating ? "star-filled" : "star-empty"} 
                  />
                ))}
              </div>
              
              <p className="testimonial-text">"{currentTestimonial.feedback}"</p>
              
              <div className="testimonial-author">
                <div className="author-photo">
                  {currentTestimonial.photo ? (
                    <img src={currentTestimonial.photo} alt={currentTestimonial.name} />
                  ) : (
                    <span>{currentTestimonial.name.charAt(0)}</span>
                  )}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{currentTestimonial.name}</h4>
                  <p className="author-position">{currentTestimonial.position}</p>
                </div>
              </div>
            </div>

            <div className="carousel-controls">
              <button className="carousel-btn" onClick={handlePrev} aria-label="Previous testimonial">
                <ChevronLeft size={24} />
              </button>
              
              <div className="carousel-dots">
                {testimonials.map((_, index) => (
                  <button 
                    key={index} 
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button className="carousel-btn" onClick={handleNext} aria-label="Next testimonial">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
