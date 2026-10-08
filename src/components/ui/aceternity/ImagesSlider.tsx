"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay, currentIndex, images.length]);

  const slideVariants = {
    initial: {
      scale: 1.05,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.6,
        ease: "easeInOut" as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1.0,
      },
    },
  };

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="visible"
          exit="exit"
          variants={slideVariants}
          className="image h-full w-full absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        />
      </AnimatePresence>

      {/* Light Radial Luxury Mask */}
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/85 via-neutral-50/80 to-white/95 z-10",
            overlayClassName
          )}
        />
      )}

      {children}
    </div>
  );
};
