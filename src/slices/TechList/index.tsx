"use client";

import { FC, useLayoutEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList: FC<TechListProps> = ({ slice }) => {
  const component = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".tech-row"); // Type as HTMLElement

      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          {
            x: i % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400),
          },
          {
            x: i % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400),
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 3,
              markers: false, // Set to true if you want debug markers
            },
          }
        );
      });
    }, component);

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  return (
    <section
      ref={component}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
    >
      <Bounded as="div">
        <Heading size="xl" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.primary.tech?.map(({ tech_name, tech_color }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4"
          aria-label={tech_name || undefined}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <React.Fragment key={i}>
              <span
                className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: i === 7 && tech_color ? tech_color : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl text-slate-500">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
