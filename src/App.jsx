import React, { useState } from 'react';
import { IntroLoader } from './components/IntroLoader/IntroLoader';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { Services } from './components/Services/Services';
import { Experience } from './components/Experience/Experience';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/shared/ScrollToTop';
import './index.css';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="app-container">
      {!introFinished && (
        <IntroLoader onFinish={() => setIntroFinished(true)} />
      )}
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
