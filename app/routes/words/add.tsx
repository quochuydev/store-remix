import { redirect } from "remix";
import type { ActionFunction } from "remix";
import { setAuthToken, supabase } from "~/utils/supabase.server";
// import { WordForm } from "~/components/word-form";

export const action: ActionFunction = async ({ request }: any) => {
  const formData = await request.formData();

  const session = await setAuthToken(request);

  const newWord = {
    name: formData.get("name"),
    type: formData.get("type"),
    // sentences: formData.getAll("sentence"),
    // definitions: formData.getAll("definition"),
    // user_id: session.get("uuid"),
  };

  console.log(newWord);

  const { data, error } = await supabase
    .from("words")
    .insert([newWord])
    .single();
  console.log(data, error);

  if (error) {
    return redirect(`/words`);
  }

  return redirect(`/words/${data?.id}`);
};

export default function AddWord() {
  return (
    <>
      <form method="post">
        <input type="text" name="name" defaultValue={"name"} />
        <input type="text" name="type" defaultValue={"type"} />
        <input type="text" name="sentence" defaultValue={"sentence"} />
        <input type="text" name="definition" defaultValue={"definition"} />
        <button type="submit">create</button>
      </form>
    </>
  );
}
