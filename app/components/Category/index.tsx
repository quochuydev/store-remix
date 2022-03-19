import { useCallback, useEffect, useState } from "react";
import { supabaseClient } from "~/supabase";
const supabase = supabaseClient;

export default function Category({ name = "", value = "", onData }: any) {
  const [categories, setCategories] = useState<any>([]);
  const [category, setCategory] = useState<any>({ name: "" });

  const getCategories = useCallback(async () => {
    const { data } = await supabase.from<any>("categories").select("*");
    setCategories(data);
  }, []);

  const createCategory = useCallback(async () => {
    if (!category.name) {
      return;
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([
        {
          name: category.name,
        },
      ])
      .single();

    setCategory({ name: "" });
    getCategories();
  }, [category]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={category.name}
        onChange={(e) => setCategory({ name: e.target.value })}
        className={`max-w-lg block w-full shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-500 rounded-md`}
      />
      <button type="button" onClick={() => createCategory()}>
        +
      </button>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(e) => onData && onData(e.target.value)}
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
