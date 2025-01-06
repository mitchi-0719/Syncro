import { HandlerEvent } from "@netlify/functions";

export const parseRequest = (event: HandlerEvent) => {
  const paths = event.path
    .replace(".netlify/functions", "")
    .split("/")
    .filter(Boolean);
  const method = event.httpMethod;
  const query = event.multiValueQueryStringParameters;
  const body = event.body ? JSON.parse(event.body) : null;

  return { paths, query, method, body };
};
