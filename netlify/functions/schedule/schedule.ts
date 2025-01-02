import { Handler } from "@netlify/functions";
import { parseRequest } from "../functions/parseRequest";
import { isMethodType, MethodType } from "../types/MethodType";
import { insertSchedule } from "./insertSchedule";

export const handler: Handler = async (event) => {
  const { paths, method, body } = parseRequest(event);
  if (!isMethodType(method)) {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const results = await router(paths, method, body);
  return results;
};

const router = async (paths: Array<string>, method: MethodType, body: any) => {
  if (method === "POST") {
    if (paths[0] === "schedule") {
      return insertSchedule(paths[1], body);
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Not Found" }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};
