import { form, useLoaderData, redirect, useTransition } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
// import type { Word } from "~/models/word";
import { setAuthToken, supabase } from "~/utils/supabase.server";
import { useSupabase } from "~/utils/supabase-client";

// Here's how to delete one entry
export const action: ActionFunction = async ({ request, params }: any) => {
  const formData = await request.formData();

  // Auth Related Code
  await setAuthToken(request);

  if (formData.get("_method") === "delete") {
    await supabase
      .from<any>("words")
      .delete()
      .eq("id", params.id as string);

    return redirect("/words");
  }
};

// Here's the how to fetch one entry
export const loader: LoaderFunction = async ({ params }: any) => {
  // No need to add auth here, because GET /words is public
  const { data } = await supabase
    .from<any>("words")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export default function any() {
  const word = useLoaderData<any>();
  const supabase = useSupabase();
  let transition = useTransition();

  return (
    <div>
      <h3>
        {word.name} | {word.type}
      </h3>
      <div>form State: {transition.state}</div>
      {word.definitions.map((definition: any, i: any) => (
        <p key={i}>
          <i>{definition}</i>
        </p>
      ))}
      {word.sentences.map((sentence: any, i: any) => (
        <p key={i}>{sentence}</p>
      ))}

      {/* Adding conditional rendering might cause a warning,
      We'll deal with it later */}
      {supabase.auth.user() && (
        <>
          <form method="post">
            <input type="hidden" name="_method" value="delete" />
            <button type="submit" className="w-full">
              Delete
            </button>
          </form>
          <form method="get" action={`/words/edit/${word.id}`} className="flex">
            <button type="submit" color="primary" className="w-full">
              Edit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
