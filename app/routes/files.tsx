import type { ActionFunction, UploadHandler } from "remix";
import { json, unstable_parseMultipartFormData } from "remix";
import { supabase } from "~/utils/supabase.server";

const uploadHandler: UploadHandler = async ({
  name,
  stream,
  filename,
}: any) => {
  console.log("in uploadHandler", name);

  if (name !== "file-upload") {
    stream.resume();
    return;
  } else {
    console.log(name, filename);
  }

  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const buffer = Buffer.concat(chunks);

  const fileName = `${Date.now()}-${filename}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, buffer);
  console.log(data);

  if (error) {
    throw error;
  }

  const { publicURL } = supabase.storage.from("images").getPublicUrl(fileName);
  console.log(publicURL);

  if (!publicURL) {
    throw { message: "storage failed" };
  }

  return publicURL as string;
};

export const action: ActionFunction = async ({ request, params }: any) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  console.log("uploaded", formData.get("file-upload"));

  if (!formData.get("file-upload")) {
    throw { message: "storage failed" };
  }

  const createData = {
    url: formData.get("file-upload"),
  };

  const { data, error } = await supabase
    .from("files")
    .insert([createData])
    .single();

  console.log(data, error);
  return json(data);
};

export default function NewFile() {
  return <></>;
}
