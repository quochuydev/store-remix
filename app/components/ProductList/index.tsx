/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { Link } from "remix";

export default function ProductListWrapper({ products }: any) {
  return <ProductList {...{ products }} />;
}

function ProductList({ products, cols = 4 }: any) {
  return (
    <div className="bg-white">
      <div className="mx-auto p-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          LATEST PRODUCTS
        </h2>

        <div
          className={`mt-6 grid xs:grid-cols-1 grid-cols-${cols} gap-y-10 gap-x-6 xl:gap-x-8`}
        >
          {products.map((product: any) => (
            <ProductItem {...{ product }} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductItem({ product }: any) {
  return (
    <div key={product.id} className="group relative">
      <Link to={`/products/${product.id}`}>
        <div className="w-full h-96 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img
            src={product.image || "https://source.unsplash.com/400x300/?oyster"}
            alt={product.title}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
      </Link>
      <div className="mt-4 flex justify-between">
        <div>
          <h1 className="text-gray-700">
            <Link className="text-2xl" to={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h1>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <p className="text-md font-medium text-gray-900">
          {product.price}đ
          <span className="text-sm line-through">{product.originalPrice}đ</span>
        </p>
      </div>
    </div>
  );
}
