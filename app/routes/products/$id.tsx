import { toast } from "react-toastify";
import type { LoaderFunction } from "remix";
import ProductDetail from "~/components/ProductDetail";
import { useLoaderData } from "remix";
import { supabase } from "~/utils/supabase.server";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const loader: LoaderFunction = async ({ params }: any) => {
  const { data } = await supabase
    .from<any>("products")
    .select("*")
    .eq("id", params.id as string)
    .single();

  return data;
};

export default function Product() {
  const product = useLoaderData<any>();

  return (
    <>
      <Header />
      <ProductDetail
        product={product}
        after={() => {
          toast("Added to cart", { position: "bottom-right" });
        }}
      />
      <Footer />
    </>
  );
}
