import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";

// Props type for the page
interface PageProps {
  params: {
    uid: string;
  };
}

export default async function Page({ params }: PageProps) {
  const client = createClient();
  
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  if (!page) {
    notFound();
  }

  return <ContentBody page={page} />;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const client = createClient();
  
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title as string,
    description: page.data.meta_description as string,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => ({
    uid: page.uid,
  }));
}
