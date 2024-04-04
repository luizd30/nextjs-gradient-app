import { useEffect, useRef, useState } from "react";

export interface UseMovePosition {
  x: number;
  y: number;
}

export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function clampUseMovePosition(position: UseMovePosition) {
  return {
    x: clamp(position.x, 0, 1),
    y: clamp(position.y, 0, 1),
  };
}

export function useMove<T extends HTMLElement = HTMLDivElement>(
  onChange: (value: UseMovePosition) => void
) {
  const ref = useRef<T>(null);
  const mounted = useRef<boolean>(false);
  const isSliding = useRef(false);
  const frame = useRef(0);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    const onScrub = ({ x, y }: UseMovePosition) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        if (mounted.current && ref.current && ref.current.parentElement) {
          ref.current.style.userSelect = "none";
          const parent = ref.current.parentElement.getBoundingClientRect();

          const _x = x - parent.left;
          const _y = y - parent.top;

          onChange({ x: _x, y: _y });

          /* console.log({
            x: Math.round(x - rect.width / 2 - parentRect.left),
            y: Math.round(y - rect.width / 2 - parentRect.top),
          });
          console.log({
            maxX: Math.round(parentRect.width - 24),
            maxY: Math.round(parentRect.height - 24),
          }); */
        }
      });
    };

    const bindEvents = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopScrubbing);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", stopScrubbing);
    };

    const unbindEvents = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopScrubbing);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", stopScrubbing);
    };

    const startScrubbing = () => {
      if (!isSliding.current && mounted.current) {
        isSliding.current = true;
        bindEvents();
      }
    };

    const stopScrubbing = () => {
      if (isSliding.current && mounted.current) {
        isSliding.current = false;

        unbindEvents();
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      startScrubbing();
      event.preventDefault();
      onMouseMove(event);
    };

    const onMouseMove = (event: MouseEvent) =>
      onScrub({ x: event.clientX, y: event.clientY });

    const onTouchStart = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }

      startScrubbing();
      onTouchMove(event);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }

      onScrub({
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      });
    };

    ref.current?.addEventListener("mousedown", onMouseDown);
    ref.current?.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousedown", onMouseDown);
        ref.current.removeEventListener("touchstart", onTouchStart);
      }
    };
  }, []);

  return { ref };
}
