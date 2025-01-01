import { Handler } from "@netlify/functions";
import { parseRequest } from "../functions/parseRequest";
import { isMethodType, MethodType } from "../types/MethodType";
import { getOverview } from "./getOverview";
import { getDetail } from "./getDetail";
import { insertEvent } from "./insertEvent";

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
  switch (method) {
    case "GET":
      if (paths[1] === "overview") {
        return await getOverview(paths[2]);
      } else if (paths[1] === "detail") {
        return await getDetail(paths[2]);
      }
      break;
    case "POST":
      return insertEvent(body);
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
  }
};
