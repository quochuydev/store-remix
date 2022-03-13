/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { Link } from "remix";
import AdminLayout from "~/components/admin/Layout";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { supabase } from "~/utils/supabase.server";
import Table from "~/components/Table";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { data } = await supabase
    .from<any>("products")
    .select("*")
    .order("createdAt", { ascending: false });

  return data;
};

export default function Product() {
  const products = useLoaderData<any>();

  return (
    <AdminLayout current="product">
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Home
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <Link to={"/admin/products/new_product"}>
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              New product
            </button>
          </Link>
        </div>
      </div>

      <Table
        columns={[
          {
            id: "title",
            name: "Tên sản phẩm",
            render: function Column(product: any) {
              return (
                <div className="flex items-center whitespace-nowrap text-sm font-medium text-gray-900">
                  <img
                    className="max-w-none h-12 w-12 ring-2 ring-white"
                    src={product.image}
                    alt={product.title}
                  />
                  <Link to={`/admin/products/${product.id}`}>
                    <a className="truncate hover:text-gray-600">
                      <span>
                        {product.title}{" "}
                        <span className="text-gray-500 font-normal">
                          in {product.title}
                        </span>
                      </span>
                    </a>
                  </Link>
                </div>
              );
            },
          },
          {
            id: "price",
            name: "Giá",
            className: "text-right",
            render: function Column(product: any) {
              return (
                <div className="text-sm text-gray-500 text-right">
                  {product?.price}đ
                </div>
              );
            },
          },
          {
            id: "originalPrice",
            name: "Giá gốc",
            className: "text-right",
            render: function Column(product: any) {
              return (
                <div className="text-sm text-gray-500 text-right">
                  {product?.originalPrice}đ
                </div>
              );
            },
          },
          {
            id: "createdAt",
            name: "Ngày tạo",
            render: function Column(product: any) {
              return (
                <div className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                  {new Date(product?.createdAt).toDateString()}đ
                </div>
              );
            },
          },
          {
            id: "action",
            name: "",
            render: function Column(product: any) {
              return (
                <div className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900"
                    to={`/admin/products/${product.id}`}
                  >
                    Edit
                  </Link>{" "}
                  <a
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {}}
                  >
                    Archive
                  </a>
                </div>
              );
            },
          },
        ]}
        rows={products}
      />
    </AdminLayout>
  );
}
