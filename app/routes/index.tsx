import React from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";
import ProductFilter from "~/components/ProductFilter";
import ProductList from "~/components/ProductList";
import BlogList from "~/components/BlogList";
import BlogList2 from "~/components/BlogList2";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { supabase } from "~/utils/supabase.server";
import { Link } from "remix";
import { ClientOnly } from "remix-utils";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

export let meta: MetaFunction = () => {
  return {
    title: "Cafe for man",
    description: "Cafe for man",
  };
};

export let loader: LoaderFunction = async () => {
  const { data: products } = await supabase
    .from<any>("products")
    .select("*")
    .order("createdAt", { ascending: false });

  const { data: blogs } = await supabase
    .from<any>("blogs")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(4);

  return json({ products, blogs });
};

export default function Index() {
  let data = useLoaderData<IndexData>();
  const { products, blogs }: any = data;

  const OwlCarouselContainer = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <ClientOnly>
        <div
          style={{
            width: "100%",
            height: 500,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <img
            src={"/banner.png"}
            style={{
              width: "100%",
            }}
          />
        </div>
      </ClientOnly>
    );
  };

  return (
    <div className="bg-white">
      <Header />
      {/* <ProductFilter>
        <ProductList products={products} />
      </ProductFilter> */}

      <OwlCarouselContainer />

      <div className="grid xs:grid-cols-1 md:grid-cols-6 gap-8 mx-auto px-8">
        <div className="space-y-8 col-span-1">
          <div
            className="banner banner3 banner-fixed overlay-dark h-100"
            style={{ backgroundColor: "rgb(37, 36, 42)" }}
          >
            <figure>
              <img src={"/banner.png"} alt="banner" height={350} />
            </figure>
            <div className="p-4">
              <h4 className="text-md text-white uppercase">New Collection</h4>
              <h3 className="text-lg text-white font-bold">
                Find out Jodan trending!
              </h3>
              <Link
                to="/shop"
                className="border border-white-600 py-2 px-4 text-white block"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-8 xs:col-span-1 md:col-span-5">
          <ProductList products={products} />
        </div>
      </div>
      <BlogList blogs={blogs} />
      {/* <BlogList2 blogs={blogs} /> */}
      <Footer />
    </div>
  );
}
