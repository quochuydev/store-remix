import { supabase } from "~/utils/supabase.server";

export const fileService = {
  create: async (file: any) => {
    const generatePromise = new Promise(function (resolve: any) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function () {
        var arrayBuffer: any = reader.result;
        var bytes = new Uint8Array(arrayBuffer);
        resolve(bytes);
      };
    });

    const buffer = await generatePromise;
    const fileName = `${Date.now()}-${file.name}`;

    console.log(supabase);

    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, buffer as any);
    if (error) {
      throw error;
    }
    const { publicURL } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);
    return { url: publicURL };
  },
  update: (id: string, data: any) => {
    return {};
  },
  delete: (id: string) => {
    return {};
  },
  getList: () => {
    return [];
  },
};
