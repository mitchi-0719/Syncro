import { parseDetailData } from "../functions/parseDetailData";
import { supabase } from "../util/supabase";

export const getDetail = async (event_id: string) => {
  if (!event_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing event_id" }),
    };
  }

  try {
    const { data, error } = await supabase
      .from("event_detail")
      .select(`*`)
      .eq("event_id", event_id);

    if (error) {
      console.error("Supabase Query Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }

    if (!data || data.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Event not found" }),
      };
    }

    const results = parseDetailData(data);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("Transaction Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
