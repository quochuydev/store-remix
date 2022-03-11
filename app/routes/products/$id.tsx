import { useLoaderData, redirect, useTransition } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
// import type { Word } from "~/models/product";
import { setAuthToken, supabase } from "~/utils/supabase.server";
import { useSupabase } from "~/utils/supabase-client";

export const action: ActionFunction = async ({ request, params }: any) => {
  const formData = await request.formData();
  await setAuthToken(request);

  if (formData.get("_method") === "delete") {
    await supabase
      .from<any>("products")
      .delete()
      .eq("id", params.id as string);

    return redirect("/products");
  }
};

export const loader: LoaderFunction = async ({ params }: any) => {
  const { data } = await supabase
    .from<any>("products")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export default function Page() {
  const product = useLoaderData<any>();
  const supabase = useSupabase();
  let transition = useTransition();

  return (
    <div>
      <h3>
        {product.name} | {product.type}
      </h3>
      <div>form State: {transition.state}</div>
      {(product.definitions || []).map((definition: any, i: any) => (
        <p key={i}>
          <i>{definition}</i>
        </p>
      ))}
      {(product.sentences || []).map((sentence: any, i: any) => (
        <p key={i}>{sentence}</p>
      ))}

      <>
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button type="submit" className="w-full">
            Delete
          </button>
        </form>
        <form
          method="get"
          action={`/products/edit/${product.id}`}
          className="flex"
        >
          <button type="submit" color="primary" className="w-full">
            Edit
          </button>
        </form>
      </>
    </div>
  );
}
