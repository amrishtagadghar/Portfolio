"use client";

import { useEffect, useRef } from "react";

type MergeTarget = {
  element: HTMLElement;
  ghost: HTMLDivElement;
  x: number;
  y: number;
  size: number;
  active: boolean;
};

const CURSOR_SIZE = 44;
const CURSOR_OFFSET = 12;

export function GlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !stageRef.current) {
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const stage = stageRef.current;
    const targets = new Map<HTMLElement, MergeTarget>();

    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.5;
    let smoothX = pointerX;
    let smoothY = pointerY;
    let frameId = 0;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    const syncTargetMetrics = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor-merge]"));
      const liveNodes = new Set(nodes);

      targets.forEach((target, element) => {
        if (liveNodes.has(element)) {
          return;
        }

        target.ghost.remove();
        element.style.removeProperty("--cursor-pull-x");
        element.style.removeProperty("--cursor-pull-y");
        element.style.removeProperty("--cursor-contact");
        element.removeAttribute("data-cursor-active");
        targets.delete(element);
      });

      nodes.forEach((element) => {
        let target = targets.get(element);

        if (!target) {
          const ghost = document.createElement("div");
          ghost.className = "glass-cursor-ghost";
          stage.appendChild(ghost);

          target = {
            element,
            ghost,
            x: 0,
            y: 0,
            size: 0,
            active: false
          };

          targets.set(element, target);
          resizeObserver.observe(element);
        }

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        target.x = rect.left + rect.width * 0.5;
        target.y = rect.top + rect.height * 0.5;
        target.size = size;

        target.ghost.style.width = `${rect.width}px`;
        target.ghost.style.height = `${rect.height}px`;
        target.ghost.style.left = `${target.x}px`;
        target.ghost.style.top = `${target.y}px`;
        target.ghost.style.borderRadius = getComputedStyle(element).borderRadius;
      });
    };

    const update = () => {
      smoothX += (pointerX - smoothX) * 0.18;
      smoothY += (pointerY - smoothY) * 0.18;

      cursor.style.left = `${smoothX + CURSOR_OFFSET}px`;
      cursor.style.top = `${smoothY + CURSOR_OFFSET}px`;

      targets.forEach((target) => {
        const dx = smoothX - target.x;
        const dy = smoothY - target.y;
        const distance = Math.hypot(dx, dy);
        const activationDistance = target.size * 0.5 + CURSOR_SIZE * 0.65;
        const contact = clamp(1 - distance / activationDistance, 0, 1);
        const active = contact > 0.02;

        target.active = active;
        target.ghost.style.opacity = active ? String(0.2 + contact * 0.65) : "0";

        const safeDistance = Math.max(distance, 1);
        const pull = contact * 14;
        const pullX = (dx / safeDistance) * pull;
        const pullY = (dy / safeDistance) * pull;

        target.ghost.style.transform = `translate(calc(-50% + ${pullX}px), calc(-50% + ${pullY}px)) scale(${1 + contact * 0.08})`;
        target.element.style.setProperty("--cursor-pull-x", `${pullX}px`);
        target.element.style.setProperty("--cursor-pull-y", `${pullY}px`);
        target.element.style.setProperty("--cursor-contact", contact.toFixed(3));
        target.element.toggleAttribute("data-cursor-active", active);
      });

      frameId = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const handleLayoutShift = () => {
      syncTargetMetrics();
    };

    const resizeObserver = new ResizeObserver(syncTargetMetrics);
    const mutationObserver = new MutationObserver(syncTargetMetrics);

    syncTargetMetrics();

    targets.forEach((target) => {
      resizeObserver.observe(target.element);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-cursor-merge", "class"]
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleLayoutShift, { passive: true });
    window.addEventListener("scroll", handleLayoutShift, { passive: true });

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleLayoutShift);
      window.removeEventListener("scroll", handleLayoutShift);
      resizeObserver.disconnect();
      mutationObserver.disconnect();

      targets.forEach((target) => {
        target.ghost.remove();
        target.element.style.removeProperty("--cursor-pull-x");
        target.element.style.removeProperty("--cursor-pull-y");
        target.element.style.removeProperty("--cursor-contact");
        target.element.removeAttribute("data-cursor-active");
      });
    };
  }, []);

  return (
    <>
      <svg className="glass-cursor-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="glass-cursor-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 24 -12
              "
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="glass-cursor-layer" aria-hidden="true">
        <div ref={stageRef} className="glass-cursor-stage">
          <div ref={cursorRef} className="glass-cursor-orb" />
        </div>
      </div>
    </>
  );
}
