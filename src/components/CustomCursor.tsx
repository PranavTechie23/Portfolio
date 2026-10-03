import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    // Direct DOM manipulation — no React state, no re-renders
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = 'none';

    let mouseX = -100;
    let mouseY = -100;
    // Ring lags behind — lerp values
    let ringX = -100;
    let ringY = -100;
    let rafId: number;
    let hovering = false;
    let clicking = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Ring follows cursor with smooth lerp (no framer spring needed)
      ringX = lerp(ringX, mouseX, 0.14);
      ringY = lerp(ringY, mouseY, 0.14);

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const isHovering = !!target.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]');

      if (isHovering !== hovering) {
        hovering = isHovering;
        // Dot
        dot.style.width = hovering ? '10px' : '7px';
        dot.style.height = hovering ? '10px' : '7px';
        dot.style.background = hovering
          ? 'radial-gradient(circle, #22d3ee 0%, #3b82f6 100%)'
          : '#e2e8f0';
        dot.style.boxShadow = hovering
          ? '0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)'
          : 'none';
        // Ring
        ring.style.width = hovering ? '44px' : '36px';
        ring.style.height = hovering ? '44px' : '36px';
        ring.style.borderColor = hovering
          ? 'rgba(34, 211, 238, 0.7)'
          : 'rgba(148, 163, 184, 0.35)';
        ring.style.borderWidth = hovering ? '1.5px' : '1px';
        ring.style.backgroundColor = hovering
          ? 'rgba(34, 211, 238, 0.07)'
          : 'rgba(148, 163, 184, 0.04)';
        ring.style.boxShadow = hovering
          ? '0 0 18px rgba(34,211,238,0.25), inset 0 0 8px rgba(34,211,238,0.08)'
          : 'none';
      }
    };

    const onMouseDown = () => {
      clicking = true;
      ring.style.width = '28px';
      ring.style.height = '28px';
    };
    const onMouseUp = () => {
      clicking = false;
      ring.style.width = hovering ? '44px' : '36px';
      ring.style.height = hovering ? '44px' : '36px';
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body * { cursor: none !important; }
        }
      `}</style>

      {/* Main dot — snaps instantly to cursor via rAF */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#e2e8f0',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.2s ease, box-shadow 0.2s ease',
        }}
      />

      {/* Outer ring — smoothly lerps behind cursor */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: 'rgba(148, 163, 184, 0.35)',
          backgroundColor: 'rgba(148, 163, 184, 0.04)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'width 0.18s ease, height 0.18s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
