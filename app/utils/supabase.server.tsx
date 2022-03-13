import { createCookieSessionStorage } from "remix";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vnvpxpkeapawydtfisxq.supabase.co" as string;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTU0NjgwMCwiZXhwIjoxOTU1MTIyODAwfQ.MsTELqrifUTL5L4ko3H4n5gPOyNfshArW0n_EuiNeN0" as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "supabase-session",
      expires: new Date(Date.now() + 3600),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };

export const setAuthToken = async (request: Request) => {
  let session = await getSession(request.headers.get("Cookie"));

  supabase.auth.setAuth(session.get("access_token"));

  return session;
};
