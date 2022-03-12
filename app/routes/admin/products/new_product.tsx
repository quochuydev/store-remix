import { useMemo } from "react";
import type { ActionFunction } from "remix";
import {
  redirect,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
} from "remix";
import AdminLayout from "~/components/admin/Layout";
import Uploader from "~/components/Uploader";
import { supabase } from "~/utils/supabase.server";
import { useFormik } from "formik";
import * as yup from "yup";

export const action: ActionFunction = async ({ request, params }: any) => {
  let uploadHandler = async ({ name, stream, filename }: any) => {
    console.log("in uploadHandler", name);

    if (name !== "file-upload") {
      stream.resume();
      return;
    } else {
      console.log(name, filename);
    }

    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    const fileName = `${Date.now()}-${filename}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, buffer);
    if (error) {
      throw error;
    }

    const { publicURL } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    return publicURL;
  };

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  console.log("updated", formData.get("file-upload"));

  const data = {
    title: formData.get("title"),
    price: formData.get("price") || 0,
    originalPrice: formData.get("originalPrice") || 0,
    description: formData.get("description"),
    image: formData.get("file-upload"),
  };

  const { data: product, error } = await supabase
    .from("products")
    .insert([data])
    .single();
  console.log(product, error);

  if (error) {
    return redirect(`/admin/products`);
  }

  return redirect(`/admin/products/${product?.id}`);
};

export default function AdminNewProduct() {
  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string().trim().required(),
        price: yup.number().min(0).notRequired(),
        originalPrice: yup.number().min(0).notRequired(),
        description: yup.string().trim().nullable().notRequired(),
        image: yup.string().trim().nullable().notRequired(),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      title: null,
      price: 0,
      originalPrice: 0,
      description: null,
      image: null,
    },
    validationSchema: schema,
    onSubmit: async (data) => {
      console.log(data);
      try {
        formik.resetForm();
      } catch (error) {
        //
      }
    },
  });

  return (
    <AdminLayout current="product">
      {/* <form onSubmit={formik.handleSubmit} className="space-y-8 p-8"> */}
      <form
        method="post"
        encType="multipart/form-data"
        className="space-y-8 p-8"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  title
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="given-name"
                    className={`max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm rounded-md ${"border-gray-300"}`}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  price
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  originalPrice
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="originalPrice"
                    id="originalPrice"
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>

                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Image
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div
                    className={`max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${"border-gray-300"} `}
                  >
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <Uploader name="file-upload" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
