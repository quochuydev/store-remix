/* eslint-disable @next/next/no-img-element */
import { redirect, useLoaderData } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import AdminLayout from "~/components/admin/Layout";
import { supabase } from "~/utils/supabase.server";
import React, { useState } from "react";
import Editor from "~/components/Editor/Editor.client";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { data } = await supabase
    .from<any>("blogs")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export const action: ActionFunction = async ({ request, params }: any) => {
  const formData = await request.formData();

  const updateData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const id = params.id as string;
  await supabase.from("blogs").update(updateData).eq("id", id);
  return redirect(`/admin/blogs`);
};

export default function AdminEditBlog() {
  const blog = useLoaderData<any>();
  const [description, setDescription] = useState(blog.description || "");

  return (
    <AdminLayout current="blog">
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Blogs
          </h1>
        </div>
      </div>
      <form method="post">
        <div className="sm:col-span-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            title
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              defaultValue={blog.title}
              className={`flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm ${"border-gray-300"}`}
            />
          </div>
        </div>

        <input
          type="text"
          className="hidden"
          name="description"
          value={description}
        />
        <Editor
          initValue={description}
          onData={(data: string) => setDescription(data)}
        />

        <div className="mt-5 sm:mt-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Update
          </button>
        </div>
      </form>{" "}
    </AdminLayout>
  );
}
