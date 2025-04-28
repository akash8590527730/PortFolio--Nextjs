import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps ,PrismicRichText} from "@prismicio/react";
import Bounded  from "@/components/Bounded";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Avatar from "./Avatar";

/**
 * Props for `Bio`.
 */
export type BioProps = SliceComponentProps<Content.BioSlice>;

/**
 * Component for "Bio" Slices.
 */
const Bio: FC<BioProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr] items-center">
<Heading as="h1" size="xl" className="col-start-1">
  {slice.primary.heading}
</Heading>
<div className="prose prose-xl prose-slate prose-invert col-start-1">
  <PrismicRichText field={slice.primary.description}></PrismicRichText>
</div>
<Button linkField={slice.primary.button_link} label={slice.primary.button_text}/>

<Avatar  image={slice.primary.avatar} className="row-start-1 max-w-xs md:col-start-2 md:row-end-3"/>
      </div>
    </Bounded>
  );
};

export default Bio;
