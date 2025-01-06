import { supabase } from "../util/supabase";

export const getCreateEventList = async (creatorIdList: string[]) => {
  try {
    const { data, error } = await supabase
      .from("event")
      .select("event_id")
      .in("creator_id", creatorIdList);

    if (error) {
      console.error("Supabase Query Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }

    const eventIdList = data.map((d) => d.event_id);
    return {
      statusCode: 200,
      body: JSON.stringify({ eventIdList }),
    };
  } catch (error) {
    console.error("Transaction Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
