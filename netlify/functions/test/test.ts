import { Handler } from "@netlify/functions";
import { supabase } from "../util/supabase";

export const handler: Handler = async () => {
  const res = supabase.from("event").select("*");
  const { data, error } = await res;
  const results = {
    data,
    error,
  };
  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};
