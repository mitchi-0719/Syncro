import { parseDetailData } from "../functions/parseDetailData";
import { supabase } from "../util/supabase";
import { errorResponse } from "../util/errorResponse";

export const getDetail = async (event_id: string) => {
  if (!event_id) {
    return errorResponse(400, "Bad Request: event_id is required");
  }

  try {
    const { data, error } = await supabase
      .from("event_detail")
      .select(`*`)
      .eq("event_id", event_id);

    if (error) {
      console.error("Supabase Query Error:", error);
      return errorResponse(500, `Internal Server Error: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return errorResponse(404, "Not Found: event_id is not found");
    }

    const results = parseDetailData(data);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("Transaction Error:", err);
    return errorResponse(500, `Internal Server Error: ${err.message}`);
  }
};
