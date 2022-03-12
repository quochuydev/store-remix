import { useLoaderData, redirect, useTransition } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
// import type { Word } from "~/models/blog";
import { supabase } from "~/utils/supabase.server";
import { useSupabase } from "~/utils/supabase-client";

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
  const supabase = useSupabase();
  let transition = useTransition();

  return (
    <div>
      <h3>
        {blog.name} | {blog.type}
      </h3>
      <div>form State: {transition.state}</div>
      {(blog.definitions || []).map((definition: any, i: any) => (
        <p key={i}>
          <i>{definition}</i>
        </p>
      ))}
      {(blog.sentences || []).map((sentence: any, i: any) => (
        <p key={i}>{sentence}</p>
      ))}

      {supabase.auth.user() && (
        <>
          <form method="post">
            <input type="hidden" name="_method" value="delete" />
            <button type="submit" className="w-full">
              Delete
            </button>
          </form>
          <form method="get" action={`/blogs/edit/${blog.id}`} className="flex">
            <button type="submit" color="primary" className="w-full">
              Edit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
