import React, { useEffect, useRef } from 'react';

interface BlueprintCanvasProps {
  isDarkMode: boolean;
}

interface Node {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BlueprintCanvas: React.FC<BlueprintCanvasProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[][] = [];
    const spacing = window.innerWidth < 768 ? 140 : 95;
    let cols = 0;
    let rows = 0;

    let isRunning = false;
    let isIntersecting = false;
    let consecutiveStableFrames = 0;
    const STABILITY_THRESHOLD = 0.01;
    const STABLE_FRAMES_REQUIRED = 30;

    const initGrid = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      cols = Math.ceil(w / spacing) + 1;
      rows = Math.ceil(h / spacing) + 1;

      nodes = [];
      for (let c = 0; c < cols; c++) {
        nodes[c] = [];
        for (let r = 0; r < rows; r++) {
          const baseX = c * spacing;
          const baseY = r * spacing;
          nodes[c][r] = {
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
          };
        }
      }
      wakeUp();
    };

    const wakeUp = () => {
      if (!isRunning && isIntersecting) {
        isRunning = true;
        consecutiveStableFrames = 0;
        animationId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
      wakeUp();
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      wakeUp();
    };

    // Physics parameters
    const spring = 0.04;
    const friction = 0.88;
    const radius = 180; // Attraction distance
    const strength = 0.45; // Max attraction strength

    const render = () => {
      if (!isIntersecting) {
        isRunning = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const m = mouseRef.current;
      let maxVelocity = 0;

      // 1. Update Physics
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const node = nodes[c][r];
          
          let targetX = node.baseX;
          let targetY = node.baseY;

          if (m.active) {
            const dx = m.x - node.baseX;
            const dy = m.y - node.baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
              const force = (radius - dist) / radius; // 1 at center, 0 at boundary
              // Attraction toward mouse
              targetX = node.baseX + dx * force * strength;
              targetY = node.baseY + dy * force * strength;
            }
          }

          // Apply spring forces
          node.vx += (targetX - node.x) * spring;
          node.vy += (targetY - node.y) * spring;
          node.vx *= friction;
          node.vy *= friction;
          node.x += node.vx;
          node.y += node.vy;

          const vel = Math.abs(node.vx) + Math.abs(node.vy);
          if (vel > maxVelocity) {
            maxVelocity = vel;
          }
        }
      }

      // Check for stability
      const isStable = maxVelocity < STABILITY_THRESHOLD;
      if (isStable && !m.active) {
        consecutiveStableFrames++;
      } else {
        consecutiveStableFrames = 0;
      }

      // 2. Draw Grid Mesh Lines — BATCHED into a single path for performance
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = isDarkMode
        ? 'rgba(51, 65, 85, 0.16)'
        : 'rgba(148, 163, 184, 0.16)';

      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const node = nodes[c][r];

          // Line to right neighbor
          if (c < cols - 1) {
            const rightNode = nodes[c + 1][r];
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(rightNode.x, rightNode.y);
          }

          // Line to bottom neighbor
          if (r < rows - 1) {
            const bottomNode = nodes[c][r + 1];
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(bottomNode.x, bottomNode.y);
          }
        }
      }
      ctx.stroke();

      // 3. Draw Grid Nodes — BATCHED into a single fill path
      ctx.fillStyle = isDarkMode
        ? 'rgba(100, 116, 139, 0.4)'
        : 'rgba(148, 163, 184, 0.4)';

      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const node = nodes[c][r];
          ctx.moveTo(node.x + 1.5, node.y);
          ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // 4. Active Cursor Connections (per-line alpha — cannot batch)
      if (m.active) {
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const node = nodes[c][r];
            const dx = m.x - node.x;
            const dy = m.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 160) {
              const alpha = (1 - dist / 160) * 0.5;
              ctx.strokeStyle = `rgba(33, 150, 243, ${alpha})`;
              ctx.lineWidth = 0.8 + (1 - dist / 160) * 1.5;

              ctx.beginPath();
              ctx.moveTo(m.x, m.y);
              ctx.lineTo(node.x, node.y);
              ctx.stroke();
            }
          }
        }
      }

      // 4. Draw Cursor Coordinates & Target HUD ticks
      if (m.active) {
        ctx.strokeStyle = 'rgba(33, 150, 243, 0.7)';
        ctx.lineWidth = 1.2;

        // Draw crosshair axes
        ctx.beginPath();
        ctx.moveTo(m.x - 25, m.y);
        ctx.lineTo(m.x + 25, m.y);
        ctx.moveTo(m.x, m.y - 25);
        ctx.lineTo(m.x, m.y + 25);
        ctx.stroke();

        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.fillStyle = isDarkMode ? 'rgba(33, 150, 243, 0.95)' : 'rgba(33, 150, 243, 1.0)';
        ctx.fillText(`SYS.X: ${Math.round(m.x)}px`, m.x + 18, m.y - 18);
        ctx.fillText(`SYS.Y: ${Math.round(m.y)}px`, m.x + 18, m.y - 6);
      }

      if (consecutiveStableFrames >= STABLE_FRAMES_REQUIRED) {
        isRunning = false;
      } else {
        animationId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver to pause/resume the loop
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        wakeUp();
      } else {
        isRunning = false;
        cancelAnimationFrame(animationId);
      }
    }, { threshold: 0 });

    observer.observe(canvas);
    initGrid();

    window.addEventListener('resize', initGrid, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', initGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none block w-full h-full"
      style={{ willChange: 'transform' }}
    />
  );
};

export default BlueprintCanvas;
