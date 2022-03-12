/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { Link } from "remix";

const blogList = [
  {
    id: 1,
    title: "Basic Tee",
    thumpUrl:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    body: "Front of men's Basic Tee in black.",
  },
  {
    id: 2,
    title: "Basic Tee",
    thumpUrl:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    body: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    title: "Basic Tee",
    thumpUrl:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    body: "Front of men's Basic Tee in black.",
  },
  {
    id: 4,
    title: "Basic Tee",
    thumpUrl:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    body: "Front of men's Basic Tee in black.",
  },
];

export default function BlogList({ blogs }: any) {
  return (
    <div className="bg-white">
      <div className="mx-auto p-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Blog
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {blogs.map((blog: any) => (
            <div key={blog.id} className="group relative">
              <Link to={`/blogs/${blog.id}`}>
                <div className="w-full  bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                  <img
                    src={blog.thumpUrl}
                    alt={blog.title}
                    className="w-full  object-center object-cover lg:w-full "
                  />
                </div>
              </Link>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-gray-700">
                    <Link to={`/products/${blog._id}`}>
                      <a>{blog.title}</a>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{blog.color}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
