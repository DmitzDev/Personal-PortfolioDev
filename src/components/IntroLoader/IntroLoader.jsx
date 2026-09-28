import React, { useState, useEffect, useRef, useCallback } from 'react';
import { personalInfo } from '../../data/personalInfo';
import './IntroLoader.css';

export function IntroLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'revealing'
  const [isDone, setIsDone] = useState(false);
  const hasFinishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setPhase('revealing');

    setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 900);
  }, [onFinish]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Eased progress that feels organic — starts slow, accelerates, then decelerates
    let elapsed = 0;
    const totalDuration = 2600; // ms
    const tick = 16;

    const interval = setInterval(() => {
      elapsed += tick;
      const t = Math.min(elapsed / totalDuration, 1);

      // Custom ease curve: slow start, fast middle, slow end (cubic ease-in-out)
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const value = Math.round(eased * 100);
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => finishIntro(), 350);
      }
    }, tick);

    const failsafe = setTimeout(() => finishIntro(), 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
      document.body.style.overflow = '';
    };
  }, [finishIntro]);

  if (isDone) return null;

  const isRevealing = phase === 'revealing';

  return (
    <div
      className={`intro-loader ${isRevealing ? 'is-revealing' : ''}`}
      aria-label="Loading"
    >
      {/* Top half curtain */}
      <div className="intro-curtain intro-curtain--top" />
      {/* Bottom half curtain */}
      <div className="intro-curtain intro-curtain--bottom" />

      {/* Center content */}
      <div className="intro-center">
        {/* Logo mark */}
        <div className="intro-logomark">
          {personalInfo.logoImage ? (
            <img
              src={personalInfo.logoImage}
              alt=""
              className="intro-logomark__img"
            />
          ) : (
            <span className="intro-logomark__fallback">MD</span>
          )}
        </div>

        {/* Wordmark */}
        <h1 className="intro-wordmark">
          Mitch<span className="intro-wordmark__accent">Dev.</span>
        </h1>

        {/* Progress */}
        <div className="intro-progress">
          <div className="intro-progress__track">
            <div
              className="intro-progress__fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
