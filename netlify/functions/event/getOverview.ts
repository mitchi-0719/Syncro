import { supabase } from "../util/supabase";

export const getOverview = async (event_id: string) => {
  if (!event_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing event_id" }),
    };
  }

  try {
    const { data, error } = await supabase
      .from("event")
      .select("event_id, title, create_at")
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

    return {
      statusCode: 200,
      body: JSON.stringify(data[0]),
    };
  } catch (err) {
    console.error("Transaction Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
