import { Form, useTransition } from "remix";
import type { LoaderFunction } from "remix";
import { useLoaderData, Link, Outlet } from "remix";
import { supabase } from "~/utils/supabase.server";
// import type { Word } from "~/models/word";
import { useSupabase } from "~/utils/supabase-client";

export const loader: LoaderFunction = async () => {
  const { data: words } = await supabase
    .from<any>("words")
    .select("id,name,type");

  return words;
};

export default function Index() {
  const words = useLoaderData<any[]>() || [];
  const transition = useTransition();
  const supabase = useSupabase();

  return (
    <main className="p-2">
      <h1 className="text-3xl text-center mb-3">English words I learned</h1>
      <div className="text-center mb-2">Route State: {transition.state}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl pb-2">Words</h2>
          <ul>
            {words.map((word: any) => (
              <li key={word.id}>
                <Link to={`/words/${word.id}`}>
                  {word.name} | {word.type}
                </Link>
              </li>
            ))}
          </ul>

          {supabase.auth.user() ? (
            <Form method="get" action={"/words/add"} className="pt-2">
              <button
                type="submit"
                className="hover:bg-primary-100 dark:hover:bg-primary-900"
              >
                Add new word
              </button>
            </Form>
          ) : (
            <Form method="get" action={`/auth`} className="flex">
              <button type="submit" color="primary" className="w-full">
                Sign-in to make changes
              </button>
            </Form>
          )}
        </div>
        <Outlet />
      </div>
    </main>
  );
}
