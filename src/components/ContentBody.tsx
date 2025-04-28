import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { components } from "@/slices";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1" className="text-slate-900 font-bold">{page.data.title}</Heading>
        <div className="flex gap-4 text-slate-600 font-bold">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-xl">
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-lg mt-12 w-full max-w-none md:mt-20 font-bold">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
