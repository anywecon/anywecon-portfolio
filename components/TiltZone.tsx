"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

const MAX_TILT = 9; // degrees
const GLOW_RADIUS = 90; // px from edge where the lime border appears

/**
 * Wraps an element so that, on a fine pointer:
 *  - it tilts in 3D toward/away from the cursor
 *  - a lime edge-glow follows the cursor near the borders
 *  - it emits awc:calm-enter / awc:calm-leave so the background gravity pauses
 */
export default function TiltZone({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  /** Static layout styles only (e.g. aspectRatio); transform is owned by the tilt logic. */
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function emit(name: "awc:calm-enter" | "awc:calm-leave") {
    window.dispatchEvent(new CustomEvent(name));
  }

  function onEnter() {
    emit("awc:calm-enter");
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;
    const ry = ((px - cx) / cx) * MAX_TILT; // rotateY
    const rx = -((py - cy) / cy) * MAX_TILT; // rotateX
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
    // edge glow position
    el.style.setProperty("--gx", `${px}px`);
    el.style.setProperty("--gy", `${py}px`);
    el.style.setProperty("--glow", "1");
  }

  function onLeave() {
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(700px) rotateX(0) rotateY(0) scale(1)";
      el.style.setProperty("--glow", "0");
    }
    emit("awc:calm-leave");
  }

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-zone ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
