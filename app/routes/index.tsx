import React from "react";
import { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";
import { ClientOnly } from "remix-utils";

import ProductFilter from "~/components/ProductFilter";
import ProductList from "~/components/ProductList";
import BlogList from "~/components/BlogList";
import BlogList2 from "~/components/BlogList2";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ProductLeftBanner from "~/components/ProductLeftBanner";
import { supabase } from "~/utils/supabase.server";
import { CartProvider } from "~/packages/react-use-cart";

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

  const { data: categories } = await supabase
    .from<any>("categories")
    .select("*");

  return json({ products, blogs, categories });
};

export default function HomeWrapper() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

function Home() {
  let data = useLoaderData<IndexData>();
  const { products, blogs, categories }: any = data;

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
            height: 800,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <img
            src={"/slider.jpg"}
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
      <OwlCarouselContainer />

      <ProductFilter>
        <ProductList products={products} />
      </ProductFilter>

      <ProductLeftBanner>
        <ProductList products={products} />
      </ProductLeftBanner>

      <BlogList blogs={blogs} />
      {/* <BlogList2 blogs={blogs} /> */}
      <Footer />
    </div>
  );
}
