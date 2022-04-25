import { supabaseClient } from "~/supabase";
const supabase = supabaseClient;

export const orderService = {
  getOne: async (id: string) => {
    const { data } = await supabase
      .from<any>("orders")
      .select("*")
      .eq("id", id as string)
      .single();

    return data;
  },
  create: (data: any) => {
    return {};
  },
  update: async (id: string, data: any) => {
    return supabase.from("orders").update(data).eq("id", id);
  },
  delete: (id: string) => {
    return {};
  },
  getList: () => {
    return [];
  },
};
