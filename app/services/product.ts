import { supabaseClient } from "~/supabase";
const supabase = supabaseClient;

export const productService = {
  create: (data: any) => {
    return {};
  },
  update: async (id: string, data: any) => {
    return supabase.from("products").update(data).eq("id", id);
  },
  delete: (id: string) => {
    return {};
  },
  getList: () => {
    return [];
  },
};
