import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";

// Params type for the dynamic route
type Params = { uid: string };

// Ensure the Page component's params are correctly typed as { params: Params }
export default async function Page({
  params,
}: {
  params: Params;
}) {
  const client = createClient();
  try {
    const page = await client.getByUID("blog_post", params.uid);
    
    if (!page || !page.data) {
      notFound(); // Ensure to handle the case if page or data is undefined
    }

    return <ContentBody page={page} />;
  } catch (error) {
    notFound();
  }
}

// Ensure generateMetadata returns a Promise<Metadata> type and params is correctly typed
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  try {
    const page = await client.getByUID("blog_post", params.uid);

    if (!page || !page.data) {
      notFound(); // Handle the case if page or data is missing
    }

    return {
      title: page.data.title,
      description: page.data.meta_description,
    };
  } catch (error) {
    return { title: "Not Found", description: "No data available" };
  }
}

// Correctly type the generateStaticParams function
export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
