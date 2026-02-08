"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export function VelocityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0 };
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;

    const colors = [
      "rgba(220, 38, 38, 0.4)", // Primary Red (low opacity)
      "rgba(220, 38, 38, 0.2)", // Primary Red (lower opacity)
      "rgba(163, 163, 163, 0.3)", // Neutral Gray
      "rgba(82, 82, 82, 0.2)", // Darker Gray
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 15000),
        150
      );
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Slight horizontal drift
          vy: Math.random() * -1 - 0.2, // Consistent upward flow (Bubble/Data rising)
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Mouse Interaction (Velocity "Boost" or Attraction)
        if (isMouseMoving) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            // Slight attraction/turbulence near mouse
            const force = (maxDistance - distance) / maxDistance;
            p.vx += (dx / distance) * force * 0.05;
            p.vy += (dy / distance) * force * 0.05;
          }
        }

        // Friction to return to normal speed
        // Horizontal friction
        if (Math.abs(p.vx) > 0.5) {
          p.vx *= 0.95;
        }

        // Vertical speed normalization (always tend towards -0.5 to -1.5)
        if (p.vy > -0.2) p.vy -= 0.01; // Don't stop or go down
        if (p.vy < -2) p.vy += 0.05; // Don't go too fast

        // Reset positions
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Optional: Velocity trails for "Speed" feel?
        // Maybe too heavy/messy. Keeping dots "Alt toque" is cleaner.
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    });

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      style={{ mixBlendMode: "multiply" }} // Blends nicely with the gradient
    />
  );
}
