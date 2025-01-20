import { getRandomId } from "../functions/getRandomId";
import { CreateEventBodyType } from "../types/CreateEventBody";
import { errorResponse } from "../util/errorResponse";
import { supabase } from "../util/supabase";

export const insertEvent = async (body: CreateEventBodyType) => {
  const eventId = await getRandomId("event");
  const creatorId = await getRandomId("creator");
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
    creator_id: creatorId,
  };
  const { error } = await supabase.from("event").insert(insertData);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return errorResponse(500, `Internal Server Error: ${error.message}`);
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
    return errorResponse(500, `Internal Server Error: ${dateError.message}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Event created successfully",
      eventId,
      creatorId,
    }),
  };
};
