"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]",
        className
      )}
    >
      {/* Ambient champagne gold gradient spots */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-amber-200/25 via-amber-100/10 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-amber-300/15 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] bg-yellow-200/20 rounded-full blur-3xl opacity-40" />

      {/* SVG Glowing Line Beams in Metallic Gold */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-champagne" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d="M -100 200 Q 400 -50 900 300 T 1800 150"
          fill="none"
          stroke="url(#beam-gold)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1900 600 Q 1200 400 600 700 T -100 500"
          fill="none"
          stroke="url(#beam-champagne)"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.path
          d="M 0 450 Q 800 650 1600 350"
          fill="none"
          stroke="url(#beam-gold)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
};
