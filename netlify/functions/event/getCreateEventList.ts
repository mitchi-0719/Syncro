import { errorResponse } from "../util/errorResponse";
import { supabase } from "../util/supabase";

export const getCreateEventList = async (creatorIdList: string[]) => {
  try {
    const { data, error } = await supabase
      .from("event")
      .select("event_id")
      .in("creator_id", creatorIdList);

    if (error) {
      console.error("Supabase Query Error:", error);
      return errorResponse(500, `Internal Server Error: ${error.message}`);
    }

    const eventIdList = data.map((d) => d.event_id);
    return {
      statusCode: 200,
      body: JSON.stringify({ eventIdList }),
    };
  } catch (error) {
    console.error("Transaction Error:", error);
    return errorResponse(500, `Internal Server Error: ${error.message}`);
  }
};
