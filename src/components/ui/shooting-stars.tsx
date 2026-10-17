"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = (width: number, height: number) => {
  const side = Math.floor(Math.random() * 4);

  switch (side) {
    // Each edge picks a position along its own length, so a streak never
    // spawns past the section and vanishes before it can be seen.
    case 0:
      return { x: Math.random() * width, y: 0, angle: 45 };
    case 1:
      return { x: width, y: Math.random() * height, angle: 135 };
    case 2:
      return { x: Math.random() * width, y: height, angle: 225 };
    default:
      return { x: 0, y: Math.random() * height, angle: 315 };
  }
};

/**
 * One occasional shooting star at a time, animated by mutating the SVG rect
 * through refs. Zero React re-renders per frame keeps the animation cheap on
 * phones; the trail grows only slightly so it stays short and elegant.
 */
export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 6,
  maxSpeed = 14,
  minDelay = 2600,
  maxDelay = 7500,
  starColor = "#FFFBF2",
  trailColor = "#7BC9A5",
  starWidth = 15,
  starHeight = 2,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const starRef = useRef<ShootingStar | null>(null);
  const boundsRef = useRef({ width: 0, height: 0 });
  const spawnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Measure the parent layer (the hero section) so streaks span the full
    // section rather than the viewport. Falls back to window dimensions.
    const measureBounds = () => {
      const parent = svgRef.current?.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          boundsRef.current = { width: rect.width, height: rect.height };
          return;
        }
      }
      boundsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    const hideStreak = () => {
      starRef.current = null;
      rectRef.current?.setAttribute("opacity", "0");
    };

    const scheduleSpawn = () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      spawnTimer.current = setTimeout(() => {
        measureBounds();
        const { width, height } = boundsRef.current;
        const { x, y, angle } = getRandomStartPoint(width, height);
        starRef.current = {
          x,
          y,
          angle,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          distance: 0,
        };
        rectRef.current?.setAttribute("opacity", "1");
        scheduleSpawn();
      }, delay);
    };

    let frame = 0;
    const tick = () => {
      const star = starRef.current;
      const rect = rectRef.current;
      if (star && rect) {
        const { width, height } = boundsRef.current;
        const radians = (star.angle * Math.PI) / 180;
        star.x += star.speed * Math.cos(radians);
        star.y += star.speed * Math.sin(radians);
        star.distance += star.speed;

        if (star.x < -40 || star.x > width + 40 || star.y < -40 || star.y > height + 40) {
          hideStreak();
        } else {
          const scale = Math.min(1 + star.distance / 260, 2.4);
          const length = starWidth * scale;
          rect.setAttribute("x", String(star.x));
          rect.setAttribute("y", String(star.y));
          rect.setAttribute("width", String(length));
          rect.setAttribute("transform", `rotate(${star.angle}, ${star.x + length / 2}, ${star.y + starHeight / 2})`);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    measureBounds();
    window.addEventListener("resize", measureBounds);
    frame = requestAnimationFrame(tick);
    scheduleSpawn();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureBounds);
      if (spawnTimer.current) {
        clearTimeout(spawnTimer.current);
        spawnTimer.current = null;
      }
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay, starWidth, starHeight]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0", className)}
    >
      <rect
        ref={rectRef}
        x={0}
        y={0}
        width={starWidth}
        height={starHeight}
        opacity={0}
        fill="url(#gradient)"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
