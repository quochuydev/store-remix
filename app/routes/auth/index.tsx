import React, { useEffect } from "react";
import { Auth } from "@supabase/ui";
import { useSubmit, redirect } from "remix";
import type { ActionFunction } from "remix";
import { useSupabase } from "~/utils/supabase-client";
import { commitSession, getSession } from "~/utils/supabase.server";

export const action: ActionFunction = async ({ request }: any) => {
  const formData = await request.formData();

  const session = await getSession(request.headers.get("Cookie"));

  session.set("access_token", formData.get("access_token"));

  return redirect("/words", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function AuthBasic() {
  const supabase = useSupabase();

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container>
        <Auth supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  );
}

const Container: React.FC = ({ children }) => {
  const { user, session } = Auth.useUser();
  const submit = useSubmit();

  useEffect(() => {
    if (user) {
      const formData = new FormData();

      const accessToken = session?.access_token;

      if (accessToken) {
        formData.append("access_token", accessToken);
        submit(formData, { method: "post", action: "/auth" });
      }
    }
  }, [user]);

  return <>{children}</>;
};
