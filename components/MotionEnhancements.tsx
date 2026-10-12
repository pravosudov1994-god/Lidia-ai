"use client";

import { useEffect, useRef } from "react";

/**
 * Progressive enhancement, intentionally restricted to the home page.
 * Accessible HTML stays visible if JS is off or animation is disabled.
 * Canvas and parallax run only on desktop while the hero is on-screen.
 */
type Particle = { x: number; y: number; vx: number; vy: number; size: number; warm: boolean };

export default function MotionEnhancements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".mg-page");
    const hero = document.querySelector<HTMLElement>(".mg-hero");
    const scene = document.querySelector<HTMLElement>(".mg-hero-scene");
    const canvas = canvasRef.current;
    if (!page || !hero || !scene || !canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowPower = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    if (prefersReducedMotion.matches) return;

    // Reveal never hides content without an observer and working JavaScript.
    const revealElements = [...page.querySelectorAll<HTMLElement>(".mg-reveal")];
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("mg-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -18px 0px" },
    );
    for (const el of revealElements) observer.observe(el);
    page.classList.add("mg-motion-on");

    if (lowPower.matches) {
      return () => {
        observer.disconnect();
        page.classList.remove("mg-motion-on");
      };
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      return () => {
        observer.disconnect();
        page.classList.remove("mg-motion-on");
      };
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let scrollFrame = 0;
    let playing = false;
    let heroVisible = false;
    let lastDraw = 0;
    let particles: Particle[] = [];
    const maxDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let seed = 314159;

    function random() {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    function resize() {
      if (!canvas || !hero || !ctx) return;
      const bounds = hero.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      canvas.width = Math.round(width * maxDpr);
      canvas.height = Math.round(height * maxDpr);
      ctx.setTransform(maxDpr, 0, 0, maxDpr, 0, 0);
      seed = 314159;
      const count = Math.min(27, Math.max(15, Math.round(width / 65)));
      particles = Array.from({ length: count }, () => ({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * 0.17,
        vy: (random() - 0.5) * 0.13,
        size: 0.5 + random() * 1.3,
        warm: random() > 0.42,
      }));
    }

    function draw(t: number) {
      if (!ctx || !playing) return;
      frame = requestAnimationFrame(draw);
      // 25fps upper bound keeps the effect lightweight on desktop.
      if (t - lastDraw < 40) return;
      lastDraw = t;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x = (p.x + p.vx + width) % width;
        p.y = (p.y + p.vy + height) % height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.warm ? "rgba(255,191,101,.47)" : "rgba(104,169,212,.32)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared > 120 * 120) continue;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.lineWidth = 0.6;
          ctx.strokeStyle = "rgba(224,165,88," + (0.075 * (1 - Math.sqrt(distanceSquared) / 120)) + ")";
          ctx.stroke();
        }
      }
    }

    function stop() {
      playing = false;
      cancelAnimationFrame(frame);
      frame = 0;
    }
    function syncMotion() {
      const shouldPlay = heroVisible && !document.hidden && !prefersReducedMotion.matches;
      if (shouldPlay && !playing) {
        playing = true;
        frame = requestAnimationFrame(draw);
      } else if (!shouldPlay && playing) {
        stop();
      }
    }

    const heroObserver = new IntersectionObserver(entries => {
      heroVisible = entries[0]?.isIntersecting ?? false;
      syncMotion();
    }, { threshold: 0.02 });

    function updateParallax() {
      scrollFrame = 0;
      if (!hero || !scene || prefersReducedMotion.matches || document.hidden) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      scene.style.setProperty("--mg-photo-shift", (progress * 27).toFixed(1) + "px");
      scene.style.setProperty("--mg-hud-shift", (progress * -10).toFixed(1) + "px");
    }

    function onScroll() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateParallax);
    }

    function onResize() {
      resize();
      onScroll();
    }
    function onMotionChange() {
      syncMotion();
      if (prefersReducedMotion.matches && scene) {
        scene.style.removeProperty("--mg-photo-shift");
        scene.style.removeProperty("--mg-hud-shift");
      }
    }

    resize();
    heroObserver.observe(hero);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", syncMotion);
    prefersReducedMotion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
      stop();
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", syncMotion);
      prefersReducedMotion.removeEventListener("change", onMotionChange);
      scene.style.removeProperty("--mg-photo-shift");
      scene.style.removeProperty("--mg-hud-shift");
      page.classList.remove("mg-motion-on");
    };
  }, []);

  return <canvas ref={canvasRef} className="mg-motion-particles" aria-hidden="true" />;
}
