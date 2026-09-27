import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../../data/personalInfo';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import './Contact.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setErrorMessage(error.text || error.message || 'Unknown error occurred');
        console.error('EmailJS Error:', error);
        setTimeout(() => setSubmitStatus(null), 10000);
      });
  };

  return (
    <section id="contact" className="section contact-section bg-secondary">
      <div className="container">
        <SectionHeader title="Contact Me" subtitle="Get in Touch" />

        <div className="contact-content">
          <AnimateOnScroll className="contact-info">
            <h3>Let's talk about everything!</h3>
            <p className="contact-desc">
              Don't like forms? Send me an email.
            </p>

            <div className="info-list">
              <div className="info-item glass-card">
                <div className="info-icon-box">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></p>
                </div>
              </div>

              <div className="info-item glass-card">
                <div className="info-icon-box">
                  <Phone size={24} />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p><a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a></p>
                </div>
              </div>

              <div className="info-item glass-card">
                <div className="info-icon-box">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200} className="contact-form-wrapper glass-card">
            <form ref={form} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className={`btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loader-dots">Sending</span>
                ) : (
                  <>Send Message <Send size={18} className="ml-2" /></>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="submit-success">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="submit-error" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '0.75rem', textAlign: 'center' }}>
                  Failed: {errorMessage}
                </div>
              )}
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
