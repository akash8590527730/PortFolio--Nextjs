import { useEffect } from "react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience: FC<ExperienceProps> = ({ slice }) => {
  useEffect(() => {
    // GSAP animation for the experience blocks
    gsap.from(".experience-item", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>

      {/* ✅ optional chaining added */}
      {slice.primary.zone?.map((item, index) => (
        <div
          key={index}
          className="experience-item ml-6 mt-8 max-w-prose md:ml-12 md:mt-16"
        >
          {item.title && (
            <Heading as="h3" size="sm">
              {item.title}
            </Heading>
          )}

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
            {item.time_period && <span>{item.time_period}</span>}{" "}
            <span className="text-3xl font-extralight">/</span>{" "}
            {item.institution && <span>{item.institution}</span>}
          </div>

          {item.description && (
            <div className="prose prose-lg prose-invert mt-4">
              <PrismicRichText field={item.description} />
            </div>
          )}
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
