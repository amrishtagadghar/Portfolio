"use client";

import { useEffect, useRef } from "react";

type MergeTarget = {
  element: HTMLElement;
  ghost: HTMLDivElement;
  isDecor: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  x: number;
  y: number;
  size: number;
  active: boolean;
};

const CURSOR_SIZE = 44;
const CURSOR_OFFSET = 12;
const MERGE_SELECTOR = "[data-cursor-merge], .cursor-merge-decor";

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
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(MERGE_SELECTOR));
      const liveNodes = new Set(nodes);

      targets.forEach((target, element) => {
        if (liveNodes.has(element)) {
          return;
        }

        target.ghost.remove();
        element.style.removeProperty("--blob-shift-x");
        element.style.removeProperty("--blob-shift-y");
        element.style.removeProperty("--blob-contact");
        element.style.removeProperty("--blob-scale");
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
            isDecor: false,
            left: 0,
            top: 0,
            width: 0,
            height: 0,
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
        const computed = getComputedStyle(element);
        const isDecor = element.classList.contains("cursor-merge-decor");

        target.isDecor = isDecor;
        target.left = rect.left;
        target.top = rect.top;
        target.width = rect.width;
        target.height = rect.height;
        target.x = rect.left + rect.width * 0.5;
        target.y = rect.top + rect.height * 0.5;
        target.size = size;

        target.ghost.style.width = `${rect.width}px`;
        target.ghost.style.height = `${rect.height}px`;
        target.ghost.style.left = `${target.x}px`;
        target.ghost.style.top = `${target.y}px`;
        target.ghost.style.borderRadius = computed.borderRadius;
        target.ghost.classList.toggle("cursor-ghost-decor", isDecor);
        target.ghost.style.background = computed.background;
        target.ghost.style.border = computed.border;
        target.ghost.style.boxShadow = computed.boxShadow;
        target.ghost.style.filter = computed.filter === "none" ? "" : computed.filter;
        target.ghost.style.opacity = isDecor ? "0" : computed.opacity;
      });
    };

    const update = () => {
      smoothX += (pointerX - smoothX) * 0.18;
      smoothY += (pointerY - smoothY) * 0.18;

      cursor.style.left = `${smoothX + CURSOR_OFFSET}px`;
      cursor.style.top = `${smoothY + CURSOR_OFFSET}px`;

      targets.forEach((target) => {
        const nearestX = clamp(smoothX, target.left, target.left + target.width);
        const nearestY = clamp(smoothY, target.top, target.top + target.height);
        const edgeDx = smoothX - nearestX;
        const edgeDy = smoothY - nearestY;
        const edgeDistance = Math.hypot(edgeDx, edgeDy);
        const insideX = smoothX >= target.left && smoothX <= target.left + target.width;
        const insideY = smoothY >= target.top && smoothY <= target.top + target.height;
        const isInside = insideX && insideY;
        const edgeInset = isInside
          ? Math.min(
              smoothX - target.left,
              target.left + target.width - smoothX,
              smoothY - target.top,
              target.top + target.height - smoothY
            )
          : 0;
        const edgeActivation = CURSOR_SIZE * 1.4;
        const insideActivation = Math.min(Math.max(target.size * 0.18, 36), 92);
        const contact = isInside
          ? clamp(0.5 + (1 - edgeInset / insideActivation) * 0.5, 0.45, 1)
          : clamp(1 - edgeDistance / edgeActivation, 0, 1);
        const active = contact > 0.02;
        const dx = smoothX - target.x;
        const dy = smoothY - target.y;
        const distance = Math.hypot(dx, dy);

        target.active = active;
        target.ghost.style.opacity = active ? (target.isDecor ? String(0.08 + contact * 0.18) : String(0.18 + contact * 0.3)) : "0";

        const safeDistance = Math.max(distance, 1);
        const pull = contact * 18;
        const pullX = (dx / safeDistance) * pull;
        const pullY = (dy / safeDistance) * pull;
        const blobShift = Math.min(target.size * 0.06, 24) * contact;
        const blobShiftX = (dx / safeDistance) * blobShift;
        const blobShiftY = (dy / safeDistance) * blobShift;
        const blobScale = 1 + contact * 0.032;

        target.ghost.style.transform = `translate(calc(-50% + ${pullX}px), calc(-50% + ${pullY}px)) scale(${1 + contact * 0.08})`;
        target.element.style.setProperty("--blob-shift-x", `${blobShiftX}px`);
        target.element.style.setProperty("--blob-shift-y", `${blobShiftY}px`);
        target.element.style.setProperty("--blob-contact", contact.toFixed(3));
        target.element.style.setProperty("--blob-scale", blobScale.toFixed(3));
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
        target.element.style.removeProperty("--blob-shift-x");
        target.element.style.removeProperty("--blob-shift-y");
        target.element.style.removeProperty("--blob-contact");
        target.element.style.removeProperty("--blob-scale");
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
