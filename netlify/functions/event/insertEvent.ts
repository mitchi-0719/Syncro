import { getRandomId } from "../functions/getRandomId";
import { CreateScheduleBodyType } from "../types/CreateScheduleBody";
import { supabase } from "../util/supabase";

export const insertEvent = async (body: CreateScheduleBodyType) => {
  const eventId = await getRandomId("event");
  const today = new Date().toISOString().split("T")[0];
  const { title, description, defaultStartTime, defaultEndTime, dates } = body;

  const insertData = {
    event_id: eventId,
    title,
    description,
    create_at: today,
    last_update_at: today,
    default_start_time: defaultStartTime,
    default_end_time: defaultEndTime,
  };
  const { error } = await supabase.from("event").insert(insertData);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  const dateData = dates.map((date) => {
    return {
      event_date: date.eventDate,
      event_id: eventId,
      start_time: date.startTime,
      end_time: date.endTime,
      memo: date.memo,
    };
  });

  const { error: dateError } = await supabase.from("date").insert(dateData);

  if (dateError) {
    console.error("Supabase Insert Error:", dateError);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: dateError.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Event created successfully" }),
  };
};
