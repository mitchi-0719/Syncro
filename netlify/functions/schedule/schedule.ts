import { Handler } from "@netlify/functions";
import { parseRequest } from "../functions/parseRequest";
import { isMethodType, MethodType } from "../types/MethodType";
import { errorResponse } from "../util/errorResponse";
import { insertSchedule } from "./insertSchedule";

export const handler: Handler = async (event) => {
  const { paths, method, body } = parseRequest(event);
  if (!isMethodType(method)) {
    return errorResponse(405, "Method Not Allowed");
  }

  const results = await router(paths, method, body);
  return results;
};

const router = async (paths: Array<string>, method: MethodType, body: any) => {
  if (method === "POST") {
    if (paths[0] === "schedule") {
      return insertSchedule(paths[1], body);
    } else {
      return errorResponse(400, "Bad Request");
    }
  } else {
    return errorResponse(405, "Method Not Allowed");
  }
};
