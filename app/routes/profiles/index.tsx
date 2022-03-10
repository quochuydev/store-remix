import { json, redirect, Form, useLoaderData } from "remix";

export async function loader() {
  return json([]);
}

export async function action({ request }: any) {
  const body = await request.formData();
  const todo = {
    id: body.get("id"),
    title: body.get("title"),
  };
  return redirect(`/profiles/${todo.id}`);
}

export default function Todos() {
  const data = useLoaderData();

  return (
    <div>
      {/* <div todos={data} /> */}
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">Create Todo</button>
      </Form>
    </div>
  );
}
