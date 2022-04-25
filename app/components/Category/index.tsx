import { useCallback, useEffect, useState } from "react";
import { supabaseClient as supabase } from "~/supabase";
import Creatable from "react-select/creatable";

export default function Category({ name = "", value = "", onData }: any) {
  const [categories, setCategories] = useState<any>([]);
  const [category, setCategory] = useState<any>({ id: null, name: "" });

  const getCategories = useCallback(async () => {
    const { data } = await supabase.from<any>("categories").select("*");
    setCategories(data);
  }, []);

  const createCategory = useCallback(async (data: { name: string }) => {
    if (!data.name) {
      return;
    }

    await supabase
      .from("categories")
      .insert([
        {
          name: data.name,
        },
      ])
      .single();

    setCategory({ name: "" });
    getCategories();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(value, categories);
    const initValue = categories.find((e: any) => e?.id === Number(value));
    if (initValue) {
      setCategory(initValue);
    }
  }, [categories]);

  return (
    <>
      {/* {JSON.stringify(category)} */}
      <Creatable
        name={name}
        options={categories.map((e: any) => ({
          id: e.id,
          label: e.name,
        }))}
        onCreateOption={(value) => {
          console.log(value);
          createCategory({ name: value });
        }}
        value={{ value: category?.id || null, label: category?.name || "" }}
        onChange={(e: any) => {
          console.log(e);
          setCategory(
            categories.find((item: any) => item?.id === Number(e.id))
          );
          onData && onData(e.id);
        }}
      />
    </>
  );
}
