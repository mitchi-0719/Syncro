import { errorResponse } from "../util/errorResponse";
import { supabase } from "../util/supabase";
import { toLowerCamelCase } from "../util/toLowerCamelCase";

export const getOverview = async (eventId: string) => {
  if (!eventId) {
    return errorResponse(400, "Bad Request: event_id is required");
  }

  try {
    const { data, error } = await supabase
      .from("event")
      .select("event_id, title, create_at")
      .eq("event_id", eventId);

    if (error) {
      console.error("Supabase Query Error:", error);
      return errorResponse(500, "Internal Server Error");
    }

    if (!data || data.length === 0) {
      return errorResponse(404, `Not Found: ${eventId} is not found`);
    }

    return {
      statusCode: 200,
      body: Object.entries(data[0]).reduce((acc, [key, value]) => {
        acc[toLowerCamelCase(key)] = value;
        return acc;
      }, {}),
    };
  } catch (err) {
    console.error("Transaction Error:", err);
    return errorResponse(500, "Internal Server Error");
  }
};
