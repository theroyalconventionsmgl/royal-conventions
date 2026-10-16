"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe3D, type Globe3DConfig } from "./3d-globe";

/** True on phone/tablet viewports (client-only; defaults to desktop). */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

/**
 * True while the tab is visible. Freezes the WebGL render loop when the page
 * is hidden so background tabs consume no GPU or battery.
 */
function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

/**
 * Neutral fallback rendered when the WebGL Earth texture fails to load.
 * A plain dark sphere on black — no colored halo, ring, or glow.
 */
function NeutralGlobeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
      <div
        className="aspect-square h-[72%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 32%, #232625 0%, #101312 55%, #000000 100%)",
        }}
      />
    </div>
  );
}

class GlobeErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Texture/CDN failure is handled visually by the fallback; nothing to log
    // beyond what the browser console already reports.
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

interface HeroGlobeProps {
  config?: Globe3DConfig;
  className?: string;
}

/**
 * Full-bleed hero globe: transparent WebGL Earth with graceful degradation.
 * Caps pixel ratio and geometry on mobile GPUs and pauses rendering while
 * the tab is hidden. A single instance is rendered per hero.
 */
export function HeroGlobe({ config, className }: HeroGlobeProps) {
  const isMobile = useIsMobile();
  const pageVisible = usePageVisible();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      <GlobeErrorBoundary fallback={<NeutralGlobeFallback />}>
        <Globe3D
          config={{ ...config, sphereDetail: isMobile ? 32 : 48 }}
          className={className}
          dpr={isMobile ? [1, 1.25] : [1, 1.5]}
          frameloop={pageVisible && inView ? "always" : "never"}
        />
      </GlobeErrorBoundary>
    </div>
  );
}

export default HeroGlobe;
