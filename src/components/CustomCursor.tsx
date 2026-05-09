"use client";

import { useEffect, useRef, useState } from "react";

const interactiveSelector =
  "a, button, input, textarea, select, [role='button'], [data-cursor='pointer']";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateEnabled = () => {
      const canUseCustomCursor = mediaQuery.matches;
      setEnabled(canUseCustomCursor);

      if (!canUseCustomCursor) {
        document.body.classList.remove("custom-cursor-enabled");
      }
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-enabled");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let hoveringInteractive = false;
    let isPressed = false;

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.2;
      currentY.current += (targetY.current - currentY.current) * 0.2;

      const scale = isPressed ? 0.85 : hoveringInteractive ? 1.45 : 1;

      dot.style.transform = `translate3d(${targetX.current}px, ${targetY.current}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%) scale(${scale})`;

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: MouseEvent) => {
      targetX.current = event.clientX;
      targetY.current = event.clientY;

      const target = event.target as Element | null;
      hoveringInteractive = Boolean(target?.closest(interactiveSelector));

      ring.dataset.interactive = hoveringInteractive ? "true" : "false";
      dot.dataset.hidden = "false";
      ring.dataset.hidden = "false";
    };

    const handleDown = () => {
      isPressed = true;
    };

    const handleUp = () => {
      isPressed = false;
    };

    const handleLeaveWindow = () => {
      dot.dataset.hidden = "true";
      ring.dataset.hidden = "true";
    };

    const handleEnterWindow = () => {
      dot.dataset.hidden = "false";
      ring.dataset.hidden = "false";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseleave", handleLeaveWindow);
    window.addEventListener("mouseenter", handleEnterWindow);

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);

      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseleave", handleLeaveWindow);
      window.removeEventListener("mouseenter", handleEnterWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="custom-cursor-layer">
      <div className="custom-cursor-dot" ref={dotRef} data-hidden="true" />
      <div className="custom-cursor-ring" ref={ringRef} data-hidden="true" />
    </div>
  );
};

export default CustomCursor;
