import { getRandomId } from "../functions/getRandomId";
import { InsertScheduleBodyType } from "../types/InsertScheduleBody";
import { supabase } from "../util/supabase";
import { errorResponse } from "../util/errorResponse";

export const insertSchedule = async (
  eventId: string,
  body: InsertScheduleBodyType
) => {
  const userId = await getRandomId("user");
  const { error: userError } = await supabase.from("user").insert({
    user_id: userId,
    user_name: body.name,
  });

  if (userError) {
    console.error("Supabase Insert Error:", userError);
    return errorResponse(500, `Internal Server Error: ${userError.message}`);
  }

  const { error: userEventError } = await supabase.from("user_event").insert({
    user_id: userId,
    event_id: eventId,
    memo: body.comment,
  });

  if (userEventError) {
    console.error("Supabase Insert Error:", userEventError);
    return errorResponse(
      500,
      `Internal Server Error: ${userEventError.message}`
    );
  }

  const schedule = body.schedule.map((s) => ({
    event_id: eventId,
    event_date: s.date,
    status_id: s.status,
    user_id: userId,
  }));

  const { data, error: scheduleError } = await supabase
    .from("schedule")
    .insert(schedule)
    .select("schedule_id, event_date");

  if (scheduleError) {
    console.error("Supabase Insert Error:", scheduleError);
    return errorResponse(
      500,
      `Internal Server Error: ${scheduleError.message}`
    );
  }

  const scheduleTimes = body.schedule.flatMap((s) =>
    s.scheduleTime.map((st) => ({
      schedule_id: data.find((d) => d.event_date === s.date)?.schedule_id,
      start_time: st.start_time,
      end_time: st.end_time,
    }))
  );
  const { error: scheduleTimeError } = await supabase
    .from("schedule_time")
    .insert(scheduleTimes);

  if (scheduleTimeError) {
    console.error("Supabase Insert Error:", scheduleTimeError);
    return errorResponse(
      500,
      `Internal Server Error: ${scheduleTimeError.message}`
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};
