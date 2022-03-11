import { createClient } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";

const supabaseUrl = "https://vnvpxpkeapawydtfisxq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTU0NjgwMCwiZXhwIjoxOTU1MTIyODAwfQ.MsTELqrifUTL5L4ko3H4n5gPOyNfshArW0n_EuiNeN0";
export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export { Session };
