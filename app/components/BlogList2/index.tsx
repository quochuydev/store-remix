function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function BlogList2({ blogs }: any) {
  return (
    <div className="bg-white pt-4 pb-20 px-4 sm:px-6 lg:pt-4 lg:pb-28 lg:px-8">
      <div className="relative w-full mx-auto divide-y-2 divide-gray-200">
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {blogs.map(
            (blog: {
              title: string;
              description: string;
              href: string;
              imageUrl: string;
              category: {
                name: string;
                href: string;
                color: string;
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
              <div key={blog.title}>
                <div>
                  <a className="inline-block">
                    <span
                      className={classNames(
                        blog.category?.color,
                        "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                      )}
                    >
                      {blog.category?.name}
                    </span>
                  </a>
                </div>
                <a href={blog.href} className="block mt-4">
                  <p className="text-xl font-semibold text-gray-900">
                    {blog.title}
                  </p>
                </a>
                <div className="mt-3 text-base text-gray-500">
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                    style={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  />
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0 float-left">
                    <a href={"@quochuydev"}>
                      <span className="sr-only">{"@quochuydev"}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={"https://source.unsplash.com/500x400/?blogger"}
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={"@quochuydev"}>{"@quochuydev"}</a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={blog.createdAt}>
                        {new Date(blog.createdAt).toDateString()}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{blog.readingTime} read</span>
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
