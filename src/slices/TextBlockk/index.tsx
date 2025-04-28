import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlockk`.
 */
export type TextBlockkProps = SliceComponentProps<Content.TextBlockkSlice>;

/**
 * Component for "TextBlockk" Slices.
 */
const TextBlockk: FC<TextBlockkProps> = ({ slice }) => {
  return (
 <div className="max-w-prose"> <PrismicRichText field={slice.primary.text}/></div>
  );
};

export default TextBlockk;
