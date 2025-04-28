"use client";
import { useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Experience` component.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(".experience-item");

      // GSAP ScrollTrigger animation for experience items
      gsap.from(items, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",  // When the container is 80% visible
          end: "bottom 20%", // When the container is 20% from the bottom
          scrub: 1,  // Smooth scrubbing effect for scrolling
          markers: false,  // Set to true for debugging
        },
        y: 150,  // Start from below (150px down)
        opacity: 0,  // Fade in
        duration: 1,  // Duration of animation
        stagger: 0.2,  // Stagger effect for individual items
        ease: "power3.out",  // Smooth easing
      });
    }
  }, []);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={containerRef}
    >
      <Heading as="h2" size="lg" className="text-slate-900">
        {slice.primary.heading}
      </Heading>

      {slice.primary.zone?.map(
        (
          item: {
            title?: string;
            time_period?: string;
            institution?: string;
            description?: any;
          },
          index: number
        ) => (
          <div
            key={index}
            className="experience-item ml-6 mt-8 max-w-prose md:ml-12 md:mt-16"
          >
            {item.title && (
              <Heading as="h3" size="sm" className="text-slate-800">
                {item.title}
              </Heading>
            )}

            <div className="mt-1 flex w-fit items-center gap-1 text-lg font-semibold tracking-tight text-slate-600">
              {item.time_period && <span>{item.time_period}</span>}
              {item.time_period && item.institution && (
                <span className="text-xl font-extralight text-slate-400">/</span>
              )}
              {item.institution && <span>{item.institution}</span>}
            </div>

            {item.description && (
              <div className="prose prose-lg mt-4 text-slate-700">
                <PrismicRichText field={item.description} />
              </div>
            )}
          </div>
        )
      )}
    </Bounded>
  );
};

export default Experience;
