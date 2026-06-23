"use client";

import { useEffect, useRef } from "react";

interface Dot {
  hx: number; // home x
  hy: number; // home y
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const SPACING = 32; // matches former grid-backdrop 32px
const DOT_R = 1.1;
const PULL_RADIUS = 140; // px — gravity well radius around cursor
const PULL = 0.16; // attraction strength
const SPRING = 0.045; // return-to-home strength
const FRICTION = 0.86;
const ACCENT = "200, 255, 0"; // lime rgb

export default function InteractiveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const calmZone = useRef(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const cursorEl = cursorRef.current;
    if (!canvasEl) return;
    const ctx2d = canvasEl.getContext("2d");
    if (!ctx2d) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function buildDots() {
      const dots: Dot[] = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
        }
      }
      dotsRef.current = dots;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      const dots = dotsRef.current;
      const px = pointer.current.x;
      const py = pointer.current.y;
      const active = pointer.current.active;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        if (active) {
          const dx = px - d.x;
          const dy = py - d.y;
          const dist = Math.hypot(dx, dy);
          if (dist < PULL_RADIUS && dist > 0.01) {
            const force = (1 - dist / PULL_RADIUS) * PULL;
            d.vx += (dx / dist) * force * dist * 0.08;
            d.vy += (dy / dist) * force * dist * 0.08;
          }
        }

        // spring back home
        d.vx += (d.hx - d.x) * SPRING;
        d.vy += (d.hy - d.y) * SPRING;
        d.vx *= FRICTION;
        d.vy *= FRICTION;
        d.x += d.vx;
        d.y += d.vy;

        // displacement → brightness/size near cursor
        const disp = Math.hypot(d.x - d.hx, d.y - d.hy);
        const heat = Math.min(disp / 18, 1);
        const r = DOT_R + heat * 1.6;
        const baseA = 0.22;
        const a = baseA + heat * 0.65;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${ACCENT}, ${a})`;
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(render);
    }

    function staticRender() {
      // reduced-motion: draw plain dotted grid, no animation
      ctx.clearRect(0, 0, width, height);
      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(${ACCENT}, 0.18)`;
        ctx.arc(d.hx, d.hy, DOT_R, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function onMove(e: PointerEvent) {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      // gravity disabled while hovering an interactive zone (spec field / screenshot)
      pointer.current.active = !calmZone.current;
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorEl.style.opacity = "1";
      }
    }
    function onLeave() {
      pointer.current.active = false;
      if (cursorEl) cursorEl.style.opacity = "0";
    }
    function onDown() {
      if (cursorEl) cursorEl.style.transform += " scale(0.7)";
    }
    function onUp() {
      if (cursorEl)
        cursorEl.style.transform = cursorEl.style.transform.replace(" scale(0.7)", "");
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      staticRender();
    } else {
      raf.current = requestAnimationFrame(render);
    }

    function onCalmEnter() {
      calmZone.current = true;
      pointer.current.active = false;
      if (cursorEl) cursorEl.dataset.calm = "true";
    }
    function onCalmLeave() {
      calmZone.current = false;
      if (cursorEl) delete cursorEl.dataset.calm;
    }

    if (fine) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("awc:calm-enter", onCalmEnter);
      window.addEventListener("awc:calm-leave", onCalmLeave);
    }

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("awc:calm-enter", onCalmEnter);
      window.removeEventListener("awc:calm-leave", onCalmLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      />
      {/* custom lime cursor — hidden on touch via media query in globals */}
      <div
        ref={cursorRef}
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      >
        <span className="block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime bg-lime/20 backdrop-blur-[1px] transition-transform" />
      </div>
    </>
  );
}
