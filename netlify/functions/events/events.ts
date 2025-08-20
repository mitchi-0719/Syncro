import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { getCreateEventList } from "./getCreateEventList";
import { getOverview } from "./getOverview";
import { getDetail } from "./getDetail";
import { insertEvent } from "./insertEvent";

export const app = express();
app.use(express.json());
const router = express.Router();
app.use(`/.netlify/functions/events`, router);
export const handler = serverless(app);

router.get("/created-events", async (req: Request, res: Response) => {
  const creatorIds = (req.query.creatorId as string[]) ?? [];
  const results = await getCreateEventList(creatorIds);
  res.status(results.statusCode).json(results.body);
});

router.get("/:eventId", async (req: Request, res: Response) => {
  const results = await getOverview(req.params.eventId);
  res.status(results.statusCode).json(results.body);
});

router.get("/:eventId/detail", async (req: Request, res: Response) => {
  const results = await getDetail(req.params.eventId);
  res.status(results.statusCode).json(results.body);
});

router.post("/", async (req: Request, res: Response) => {
  console.log("Request Body:", req.body);
  console.log("Request Headers:", req.headers);
  const results = await insertEvent(req.body);
  res.status(results.statusCode).json(results.body);
});

router.put("/:eventId", (req: Request, res: Response) => {
  res.json({
    message: "Development discontinued",
  });
});

router.delete("/:eventId", (req: Request, res: Response) => {
  res.json({
    message: "Development discontinued",
  });
});
