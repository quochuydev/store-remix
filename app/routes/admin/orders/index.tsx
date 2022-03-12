/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import AdminLayout from "~/components/admin/Layout";
import Table from "~/components/Table";
import { toast } from "react-toastify";
import { productService } from "~/services";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { supabase } from "~/utils/supabase.server";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("createdAt", { ascending: false });

  return data;
};

export default function Order({}) {
  const orders = useLoaderData<any>();

  return (
    <AdminLayout current="order">
      <Table
        columns={[
          {
            id: "id",
            name: "id",
            render: function Column(data: any) {
              return <button>button {data.id}</button>;
            },
          },
          {
            id: "lineItems",
            name: "Line items",
            render: function Column(data: any) {
              return (
                <>
                  {data.lineItems?.map((lineItem: any, index: any) => (
                    <div key={index}>
                      <p>{lineItem.title}</p>
                      <p>{lineItem.price}</p>
                    </div>
                  ))}
                </>
              );
            },
          },
          {
            id: "createdAt",
            name: "Created at",
            render: function Column(data: any) {
              return <>{new Date(data.createdAt).toDateString()}</>;
            },
          },
          {
            id: "total",
            name: "total",
          },
          {
            id: "action",
            name: "",
            render: function Column(data: any) {
              return (
                <>
                  <a
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {}}
                  >
                    Edit
                  </a>{" "}
                  <a
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {}}
                  >
                    Archive
                  </a>
                  <select
                    onChange={async (event) => {
                      console.log(event.target.value);
                      await productService.update(data.id, {
                        status: event.target.value,
                      });
                      toast("Updated successfully");
                    }}
                    value={data.status}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={"new"}>New</option>
                    <option value={"in-progress"}>In-progress</option>
                    <option value={"done"}>Done</option>
                  </select>
                </>
              );
            },
          },
        ]}
        rows={orders}
      />
    </AdminLayout>
  );
}
