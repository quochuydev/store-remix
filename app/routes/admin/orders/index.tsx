/* eslint-disable @next/next/no-img-element */
import AdminLayout from "~/components/admin/Layout";
import Table from "~/components/Table";
import { toast } from "react-toastify";
import { orderService } from "~/services";
import { useLoaderData, Form, useSubmit, useTransition } from "remix";
import type { LoaderFunction } from "remix";
import { supabase } from "~/utils/supabase.server";
import { supabaseStrategy } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }: any) => {
  await supabaseStrategy.checkSession(request, {
    failureRedirect: "/login",
  });

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("createdAt", { ascending: false });
  console.log(orders);

  const { data: orderItems } = await supabase
    .from("orderItems")
    .select("*")
    .filter("orderId", "in", `(${(orders || []).map((e) => e.id)})`);
  console.log(orderItems);

  const result = orders?.map((order) => ({
    ...order,
    lineItems: orderItems?.filter((e) => e.orderId === order.id),
  }));

  return result;
};

export default function Order({}) {
  const submit = useSubmit();
  const orders = useLoaderData<any>();
  const transition = useTransition();

  return (
    <AdminLayout current="order">
      <Table
        columns={[
          {
            id: "id",
            name: "id",
            render: function Column(data: any) {
              return <button>{data.id}</button>;
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
                      <p>
                        <b>{lineItem.title}</b>
                      </p>
                      <p>
                        {lineItem.price} x {lineItem.quantity}
                      </p>
                    </div>
                  ))}
                </>
              );
            },
          },
          {
            id: "amount",
            name: "amount",
          },
          {
            id: "createdAt",
            name: "Created at",
            render: function Column(data: any) {
              return <>{new Date(data.createdAt).toDateString()}</>;
            },
          },
          {
            id: "action",
            name: "",
            render: function Column(data: any) {
              return (
                <Form method="get" onChange={(e) => submit(e.currentTarget)}>
                  {/* {transition.state} */}
                  {/* <a
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {}}
                  >
                    Edit
                  </a>{" "} */}
                  {/* <a
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {}}
                  >
                    Archive
                  </a> */}
                  <select
                    onChange={async (event) => {
                      console.log(event.target.value);
                      await orderService.update(data.id, {
                        status: event.target.value,
                      });
                      toast("Updated successfully");
                    }}
                    value={data.status}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={"new"}>New</option>
                    <option value={"in-progress"}>In-progress</option>
                    <option value={"done"}>Done</option>
                  </select>
                </Form>
              );
            },
          },
        ]}
        rows={orders}
      />
    </AdminLayout>
  );
}
