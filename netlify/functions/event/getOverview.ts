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
      .from("event_overview")
      .select("*")
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

    const results = Object.entries(data[0]).reduce(
      (acc, [key, value]) => {
        acc[key] = key === "user_event" ? undefined : value;
        return acc;
      },
      { count: data[0].user_event.length }
    );

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
