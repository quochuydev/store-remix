/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react";
import { Link } from "remix";
import { useFormik } from "formik";
import * as yup from "yup";
import AdminLayout from "~/components/admin/Layout";
import Table from "~/components/Table";
import { toast } from "react-toastify";
import Editor from "~/components/Editor/index.client";

export default function AdminBlogs({ blogs = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string().trim().required(),
        body: yup.string().trim().required(),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: schema,
    onSubmit: async (data) => {
      console.log(data);

      try {
        toast("Success");
      } catch (error) {
        toast.error("Failed");
      }
    },
  });

  return (
    <AdminLayout current="blog">
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Blogs
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <Link to={"/admin/blogs/new_blog"}>
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              New blog
            </button>
          </Link>
        </div>
      </div>

      <Table
        columns={[
          {
            id: "id",
            name: "id",
            render: function Column(data) {
              return <button>button {data._id}</button>;
            },
          },
          {
            id: "title",
            name: "title",
            render: function Column(data) {
              return <p>{data.title}</p>;
            },
          },
          {
            id: "createdAt",
            name: "Created at",
            render: function Column(data) {
              return <>{new Date(data.createdAt).toDateString()}</>;
            },
          },
          {
            id: "publish",
            name: "publish",
            render: function Column(data) {
              return (
                <>
                  <select
                    onChange={async (event) => {
                      // await axios.put(`api/blogs/${data._id}`, {
                      //   status: event.target.value,
                      // });

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
          {
            id: "action",
            name: "",
            render: function Column(data) {
              return (
                <>
                  <Link to={`/admin/blogs/${data._id}`}>
                    <a className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </a>
                  </Link>{" "}
                  <a
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {}}
                  >
                    Archive
                  </a>
                </>
              );
            },
          },
        ]}
        rows={blogs}
      />
    </AdminLayout>
  );
}
