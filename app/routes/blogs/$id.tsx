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

      <div className="mx-auto relative max-w-7xl">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-4">
            <h1 className="text-4xl font-extrabold text-center">
              {blog.title}
            </h1>

            <br />

            {/* <div>form State: {transition.state}</div> */}
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
