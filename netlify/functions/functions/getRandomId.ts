import { supabase } from "../util/supabase";

type TableType = "event" | "user" | "creator";

const getRandomString = (length: number): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789_";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

const createRandomId = (existingIds: string[]): string => {
  const idLength = 15;

  let attempts = 0;
  while (attempts < 10000) {
    const newId = getRandomString(idLength);
    if (!existingIds.includes(newId)) {
      return newId;
    }
    attempts++;
  }
  throw new Error("Failed to generate a unique ID");
};

export const getRandomId = async (tableType: TableType) => {
  const tableNameMap: { [key in TableType]: string } = {
    event: "event",
    user: "user",
    creator: "event",
  };
  const idNameMap: { [key in TableType]: string } = {
    event: "event_id",
    user: "user_id",
    creator: "creator_id",
  };

  const { data, error } = await supabase
    .from(tableNameMap[tableType])
    .select(idNameMap[tableType]);

  if (error) {
    throw new Error(error.message);
  }

  return createRandomId(data.map((d) => d[idNameMap[tableType]]));
};
