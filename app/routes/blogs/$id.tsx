import { useLoaderData, redirect, useTransition } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
// import type { Word } from "~/models/blog";
import { supabase } from "~/utils/supabase.server";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { data } = await supabase
    .from<any>("blogs")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export default function Page() {
  const blog = useLoaderData<any>();
  let transition = useTransition();

  return (
    <div>
      <Header />
      <div>
        <h1>
          {blog.title} | {blog.type}
        </h1>
        <div>form State: {transition.state}</div>
        {(blog.definitions || []).map((definition: any, i: any) => (
          <p key={i}>
            <i>{definition}</i>
          </p>
        ))}
        {(blog.sentences || []).map((sentence: any, i: any) => (
          <p key={i}>{sentence}</p>
        ))}
        <p className="mt-3 text-base text-gray-500">
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </p>
      </div>
      <Footer />
    </div>
  );
}
