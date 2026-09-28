import React, { useState, useEffect, useRef, useCallback } from 'react';
import { personalInfo } from '../../data/personalInfo';
import './IntroLoader.css';

const BOOT_LOGS = [
  { text: '$ git checkout main', isCommand: true },
  { text: '✔ React 19 vDOM environment initialized' },
  { text: '✔ UI components & design system loaded' },
  { text: '✔ Projects & repositories verified' },
  { text: '✔ Welcome to MitchDev.' },
];

export function IntroLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const hasFinishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);

    setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 750);
  }, [onFinish]);

  // Keyboard shortcut (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') finishIntro();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finishIntro]);

  // Measured, natural progression timer (~3.2s total duration)
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => finishIntro(), 400);
          return 100;
        }

        const step = prev < 30 ? 2 : prev < 60 ? 1 : prev < 85 ? 2 : 1;
        const next = Math.min(prev + step, 100);

        if (next < 20) setVisibleLogs(1);
        else if (next < 45) setVisibleLogs(2);
        else if (next < 70) setVisibleLogs(3);
        else if (next < 90) setVisibleLogs(4);
        else setVisibleLogs(5);

        return next;
      });
    }, 38);

    const failsafe = setTimeout(() => {
      finishIntro();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
      document.body.style.overflow = '';
    };
  }, [finishIntro]);

  if (isDone) return null;

  return (
    <div
      className={`clean-intro-overlay ${isExiting ? 'intro-exiting' : ''}`}
      aria-label="Portfolio Loading Screen"
    >
      {/* Cinematic Dual Blast Doors */}
      <div className="clean-shutter clean-shutter-top">
        <div className="shutter-laser-line"></div>
      </div>
      <div className="clean-shutter clean-shutter-bottom">
        <div className="shutter-laser-line"></div>
      </div>

      {/* Floating Skip Button in the corner */}
      <button
        type="button"
        className="clean-skip-btn"
        onClick={finishIntro}
        title="Skip Intro (Press ESC)"
      >
        Skip <span>[ESC]</span>
      </button>

      {/* Main Terminal Card */}
      <div className="clean-console-card">
        {/* Minimalist Titlebar */}
        <div className="clean-window-titlebar">
          <div className="window-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span className="window-title-text">bash — 80x24</span>
          <div className="window-dots-spacer"></div>
        </div>

        {/* Identity Section */}
        <div className="clean-identity-row">
          <div className="clean-logo-frame">
            {personalInfo.logoImage ? (
              <img
                src={personalInfo.logoImage}
                alt="MitchDev Logo"
                className="clean-logo-img"
              />
            ) : (
              <span className="clean-logo-text">&lt;MD /&gt;</span>
            )}
          </div>
          <div className="clean-brand-info">
            <h1 className="clean-brand-name">
              Mitch<span className="clean-accent-text">Dev.</span>
            </h1>
            <p className="clean-brand-sub">Front-End Developer & UI Engineer</p>
          </div>
        </div>

        {/* Clean Terminal Feed without timestamps */}
        <div className="clean-terminal-terminal">
          {BOOT_LOGS.slice(0, visibleLogs).map((log, idx) => (
            <div
              key={idx}
              className={`clean-log-line ${log.isCommand ? 'is-command' : ''}`}
            >
              <span className="log-message">{log.text}</span>
            </div>
          ))}
          <div className="clean-cursor-line">
            <span className="clean-prompt">❯</span>
            <span className="clean-cursor">_</span>
          </div>
        </div>

        {/* Simple Progress Bar and Percentage */}
        <div className="clean-progress-block">
          <div className="clean-progress-header">
            <span className="clean-loading-status">
              {progress === 100 ? 'Ready' : 'Loading components...'}
            </span>
            <span className="clean-percentage-num">{progress}%</span>
          </div>
          <div className="clean-track">
            <div
              className="clean-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
