import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";

// This is your route param type
type PageProps = {
  params: {
    uid: string;
  };
};

export default async function Page({ params }: PageProps) {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return <ContentBody page={page} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => ({
    uid: page.uid,
  }));
}
