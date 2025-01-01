import { Handler } from "@netlify/functions";
import { parseRequest } from "../functions/parseRequest";
import { isMethodType, MethodType } from "../types/MethodType";
import { getRandomId } from "../functions/getRandomId";

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

const router = async (
  paths: Array<string>,
  method: MethodType,
  body: object
) => {
  if (method === "POST") {
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};
