import { useCallback, useEffect, useState } from "react";
import { supabaseClient as supabase } from "~/supabase";

export default function Category({ name = "", value = "", onData }: any) {
  const [categories, setCategories] = useState<any>([]);
  const [category, setCategory] = useState<any>({ id: null, name: "" });

  const getCategories = useCallback(async () => {
    const { data } = await supabase.from<any>("categories").select("*");
    setCategories(data);
  }, []);

  const createCategory = useCallback(async (data) => {
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

  return (
    <div>
      <input
        type="text"
        value={category?.name}
        onChange={(e) => setCategory({ name: e.target.value })}
        className={`max-w-lg block w-full shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-500 rounded-md`}
      />
      <button type="button" onClick={() => createCategory(category)}>
        +
      </button>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(event) => {
          setCategory(
            categories.find((e: any) => e?.id === Number(event.target.value))
          );
          onData && onData(event.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option key={"none"} value={""}>
          No select
        </option>
        {categories.map((category: any, index: number) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
