"use client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type AvatarProps = {
  image: ImageField;
  className?: string;
};

export default function Avatar({ image, className }: AvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    // 1. Delayed entrance animation
    gsap.fromTo(
      container,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        delay: 1.2, // delay before it starts animating in
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // 2. Mouse movement interaction (left/right movement only)
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = container!.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const deltaX = e.clientX - centerX;

      const moveX = (deltaX / bounds.width) * 30; // adjust movement intensity

      gsap.to(image, {
        x: moveX,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const resetPosition = () => {
      gsap.to(image, {
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    container?.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("mouseleave", resetPosition);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  return (
    <div ref={containerRef} className={clsx("relative h-full w-full", className)}>
      <div
        ref={imageRef}
        className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 shadow-xl transition-transform"
      >
        <PrismicNextImage
          field={image}
          className="avatar-image h-full w-full object-cover"
          imgixParams={{ q: 90 }}
          alt=""
        />
        {/* Optional subtle highlight */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-white/10 to-white/5 rounded-3xl mix-blend-overlay" />
      </div>
    </div>
  );
}
