import React, { useState, useEffect } from 'react';
import { Loader } from './components/shared/Loader';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { TechStack } from './components/TechStack/TechStack';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Education } from './components/Education/Education';
import { Timeline } from './components/Timeline/Timeline';
import { Resume } from './components/Resume/Resume';
import { Certificates } from './components/Certificates/Certificates';
import { Achievements } from './components/Achievements/Achievements';
import { Statistics } from './components/Statistics/Statistics';
import { Services } from './components/Services/Services';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/shared/ScrollToTop';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="app-container">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <TechStack />
            <Projects />
            <Experience />
            <Education />
            <Timeline />
            <Resume />
            <Certificates />
            <Achievements />
            <Statistics />
            <Services />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  );
}

export default App;
