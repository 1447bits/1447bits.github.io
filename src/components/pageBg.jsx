import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageBG = () => {
  const circleRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);

  const getRandomPosition = () => {
    // Get viewport dimensions considering the circle size
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      x: Math.random() * viewportWidth,
      y: Math.random() * viewportHeight
    };
  };

  const animateCircle = () => {
    const circle = circleRef.current;
    const circle1 = circle1Ref.current;
    const circle2 = circle2Ref.current;
    const circle3 = circle3Ref.current;
    const colors = ["#87CEEB", "#6495ED", "#8B9467", "#778899", "#6c5ce7", "#66CCCC", "#45A0E6", "#3E8E41", "#5C0011", "#455A64"];

    const animate = () => {
      const newPos = getRandomPosition();
      const newPos1 = getRandomPosition();
      const newPos2 = getRandomPosition();
      const newPos3 = getRandomPosition();
      const duration = 10 + Math.random() * 10;

      gsap.to(circle, {
        duration: duration,
        left: newPos.x,
        top: newPos.y,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        ease: "sine.inOut",
      });

      gsap.to(circle2, {
        duration: duration,
        left: newPos2.x,
        top: newPos2.y,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        ease: "sine.inOut",
      });

      gsap.to(circle3, {
        duration: duration,
        left: newPos3.x,
        top: newPos2.y,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        ease: "sine.inOut",
      });

      gsap.to(circle1, {
        duration: duration,
        left: newPos1.x,
        top: newPos1.y,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        ease: "sine",
        onComplete: () => {
          animate();
        }
      });
    };

    animate(); // Start the animation
  };

  useEffect(() => {
    animateCircle();

    // Clean up GSAP animations when component is unmounted
    return () => {
      if (circleRef.current) gsap.killTweensOf(circleRef.current);
      if (circle1Ref.current) gsap.killTweensOf(circle1Ref.current);
      if (circle2Ref.current) gsap.killTweensOf(circle2Ref.current);
      if (circle3Ref.current) gsap.killTweensOf(circle3Ref.current);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div id="pageBg">
      <div className="circle" ref={circleRef}></div>
      <div className="circle-1" ref={circle1Ref}></div>
      <div className="circle-2" ref={circle2Ref}></div>
      <div className="circle-3" ref={circle3Ref}></div>
    </div>
  );
};

export default PageBG;