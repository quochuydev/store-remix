/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { Link } from "remix";

export default function ProductList({ products }: any) {
  return (
    <div className="bg-white">
      <div className="mx-auto p-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          LATEST PRODUCTS
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: any) => (
            <div key={product.id} className="group relative">
              <Link to={`/products/${product.id}`}>
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                  <img
                    src={
                      product.image ||
                      "https://source.unsplash.com/400x300/?oyster"
                    }
                    alt={product.title}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
              </Link>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-md font-medium text-gray-900">
                  {product.price}đ
                  <span className="text-sm line-through">
                    {product.originalPrice}đ
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
