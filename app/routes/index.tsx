import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import ProductFilter from "~/components/ProductFilter";
import ProductList from "~/components/ProductList";
import BlogList from "~/components/BlogList";
import BlogList2 from "~/components/BlogList2";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { supabase } from "~/utils/supabase.server";

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
    .limit(3);

  return json({ products, blogs });
};

export default function Index() {
  let data = useLoaderData<IndexData>();
  const { products, blogs }: any = data;

  return (
    <div className="bg-white">
      <Header />
      <BlogList blogs={blogs} />
      <ProductFilter>
        <ProductList products={products} />
      </ProductFilter>
      <BlogList2 blogs={blogs} />
      <Footer />
    </div>
  );
}
