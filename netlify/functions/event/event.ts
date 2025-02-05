import { Handler } from "@netlify/functions";
import { parseRequest } from "../functions/parseRequest";
import { isMethodType, MethodType } from "../types/MethodType";
import { errorResponse } from "../util/errorResponse";
import { getCreateEventList } from "./getCreateEventList";
import { getDetail } from "./getDetail";
import { getOverview } from "./getOverview";
import { insertEvent } from "./insertEvent";

export const handler: Handler = async (event) => {
  const { paths, query, method, body } = parseRequest(event);
  if (!isMethodType(method)) {
    return errorResponse(405, "Method Not Allowed");
  }

  const results = await router(paths, query, method, body);
  return results;
};

const router = async (
  paths: Array<string>,
  query: { [key: string]: string[] | undefined } | null,
  method: MethodType,
  body: any
) => {
  switch (method) {
    case "GET":
      if (paths[1] === "overview") {
        return await getOverview(paths[2]);
      } else if (paths[1] === "detail") {
        return await getDetail(paths[2]);
      } else if (paths[1] === "creator") {
        return await getCreateEventList(query?.creatorId ?? []);
      }
      break;
    case "POST":
      return insertEvent(body);
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      return errorResponse(405, "Method Not Allowed");
  }
};
