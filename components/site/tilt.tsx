"use client";

import { useRef, type ReactNode } from "react";

interface TiltProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** Maximum rotation in degrees. */
  readonly max?: number;
}

// Pointer-driven 3D tilt for mouse users. Touch and reduced-motion visitors get a static element.
export default function Tilt({ children, className = "", max = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const enabled = (event: React.PointerEvent) =>
    event.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || !enabled(event)) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(0)`;
    });
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`tilt ${className}`}
    >
      {children}
    </div>
  );
}
