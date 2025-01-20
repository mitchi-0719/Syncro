import { errorResponse } from "../util/errorResponse";
import { supabase } from "../util/supabase";

export const getOverview = async (event_id: string) => {
  if (!event_id) {
    return errorResponse(400, "Bad Request: event_id is required");
  }

  try {
    const { data, error } = await supabase
      .from("event")
      .select("event_id, title, create_at")
      .eq("event_id", event_id);

    if (error) {
      console.error("Supabase Query Error:", error);
      return errorResponse(500, "Internal Server Error");
    }

    if (!data || data.length === 0) {
      return errorResponse(404, "Not Found: event_id is not found");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data[0]),
    };
  } catch (err) {
    console.error("Transaction Error:", err);
    return errorResponse(500, "Internal Server Error");
  }
};
