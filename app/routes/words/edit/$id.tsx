import { useLoaderData, redirect } from "remix";
import type { LoaderFunction, ActionFunction } from "remix";
// import { WordForm } from "~/components/word-form";
// import type { Word } from "~/models/word";
import { setAuthToken, supabase } from "~/utils/supabase.server";

export const action: ActionFunction = async ({ request, params }: any) => {
  const formData = await request.formData();
  const id = params.id as string;

  const updates = {
    type: formData.get("type"),
    sentences: formData.getAll("sentence"),
    definitions: formData.getAll("definition"),
  };

  await setAuthToken(request);

  await supabase.from("words").update(updates).eq("id", id);

  return redirect(`/words/${id}`);
};

export const loader: LoaderFunction = async ({ params }: any) => {
  const { data } = await supabase
    .from<any>("words")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export default function EditWord() {
  const data = useLoaderData<any>();

  //   return <WordForm word={data} />;
  return <>{JSON.stringify(data)}</>;
}
