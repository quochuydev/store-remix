import { redirect } from "remix";
import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = () => {
  return redirect(`/admin/products`);
};

export default function AdminPage() {
  return null;
}
