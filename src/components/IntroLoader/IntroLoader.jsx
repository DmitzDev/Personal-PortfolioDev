import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { personalInfo } from '../../data/personalInfo';
import './IntroLoader.css';

export function IntroLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'revealing'
  const [isDone, setIsDone] = useState(false);
  const hasFinishedRef = useRef(false);
  const canvasRef = useRef(null);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setPhase('revealing');

    setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 900);
  }, [onFinish]);

  // Three.js 3D Background Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5.5;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Outer Geodesic Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const outerSphere = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerSphere);

    // Inner Counter-rotating Wireframe
    const innerGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // Glowing Node Vertices on Outer Mesh
    const pointsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
    });
    const pointsMesh = new THREE.Points(outerGeo, pointsMat);
    scene.add(pointsMesh);

    // Floating 3D Star & Particle Constellation
    const particleCount = 160;
    const posArray = new Float32Array(particleCount * 3);
    const velocityArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 8;
      posArray[i + 2] = (Math.random() - 0.5) * 6;

      velocityArray[i] = (Math.random() - 0.5) * 0.0025;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.0025;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.0025;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleField);

    // Subtle interactive mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      targetX = (e.clientX - halfX) / halfX;
      targetY = (e.clientY - halfY) / halfY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Responsive resize handler
    const onResize = () => {
      if (!canvas) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 60FPS Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp for parallax
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // 3D rotations
      outerSphere.rotation.y = elapsedTime * 0.16;
      outerSphere.rotation.x = elapsedTime * 0.09;
      pointsMesh.rotation.y = outerSphere.rotation.y;
      pointsMesh.rotation.x = outerSphere.rotation.x;

      innerSphere.rotation.y = -elapsedTime * 0.22;
      innerSphere.rotation.z = elapsedTime * 0.12;

      // Drift particle positions
      const positions = particlesGeo.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocityArray[i];
        positions[i + 1] += velocityArray[i + 1];
        positions[i + 2] += velocityArray[i + 2];

        if (positions[i] > 6) positions[i] = -6;
        if (positions[i] < -6) positions[i] = 6;
        if (positions[i + 1] > 4) positions[i + 1] = -4;
        if (positions[i + 1] < -4) positions[i + 1] = 4;
      }
      particlesGeo.attributes.position.needsUpdate = true;

      // Camera tilt
      camera.position.x = mouseX * 0.55;
      camera.position.y = -mouseY * 0.55;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      pointsMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  // Measured progress timer
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let elapsed = 0;
    const totalDuration = 2600; // ms
    const tick = 16;

    const interval = setInterval(() => {
      elapsed += tick;
      const t = Math.min(elapsed / totalDuration, 1);

      // Smooth ease-in-out curve
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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
      {/* 3D Background Canvas */}
      <canvas ref={canvasRef} className="intro-bg-canvas" />

      {/* Cinematic Top and Bottom Reveal Curtains */}
      <div className="intro-curtain intro-curtain--top" />
      <div className="intro-curtain intro-curtain--bottom" />

      {/* Center content */}
      <div className="intro-center">
        {/* Logo mark - Pure circular logo with zero unwanted border underneath */}
        <div className="intro-logomark">
          {personalInfo.logoImage ? (
            <img
              src={personalInfo.logoImage}
              alt="MitchDev Logo"
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

        {/* Progress bar */}
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
