/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { Link } from "remix";

export default function BlogList({ blogs }: any) {
  return (
    <div className="relative bg-gray-50 pt-8 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-8 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Blog for Real man
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            And your girl friend
          </p>
        </div>
        <div className="mt-8 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {blogs.map(
            (blog: {
              id: number;
              title: string;
              description: string;
              href: string;
              imageUrl: string;
              category: {
                name: string;
                href: string;
              };
              author: {
                name: string;
                href: string;
                imageUrl: string;
              };
              date: string;
              createdAt: string;
              readingTime: number;
            }) => (
              <div
                key={blog.title}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={"https://source.unsplash.com/500x400/?man,gentleman"}
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href={blog.category?.href} className="hover:underline">
                        {blog.category?.name}
                      </a>
                    </p>
                    <Link to={`/blogs/${blog.id}`} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {blog.title}
                      </p>
                      {/* <p className="mt-3 text-base text-gray-500">
                        <div
                          className="description"
                          dangerouslySetInnerHTML={{ __html: blog.description }}
                          style={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            height: 200,
                          }}
                        />
                      </p> */}
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href={"@quochuydev"}>
                        <span className="sr-only">{"quochuydev"}</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={"https://source.unsplash.com/500x400/?blogger"}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href={"@quochuydev"} className="hover:underline">
                          quochuydev
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={blog.createdAt}>
                          {new Date(blog.createdAt).toDateString()}
                        </time>
                        <span aria-hidden="true">&middot;</span>
                        <span>50 read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
