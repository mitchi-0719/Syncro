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
  const creator_ids = (req.query.creator_id as string[]) ?? [];
  const results = await getCreateEventList(creator_ids);
  res.status(results.statusCode).json(results.body);
});

router.get("/:event_id", async (req: Request, res: Response) => {
  const results = await getOverview(req.params.event_id);
  res.status(results.statusCode).json(results.body);
});

router.get("/:event_id/detail", async (req: Request, res: Response) => {
  const results = await getDetail(req.params.event_id);
  res.status(results.statusCode).json(results.body);
});

router.post("/", async (req: Request, res: Response) => {
  console.log(req.headers);
  const results = await insertEvent(req.body);
  res.status(results.statusCode).json(results.body);
});

router.put("/:event_id", (req: Request, res: Response) => {
  res.json({
    message: "Development discontinued",
  });
});

router.delete("/:event_id", (req: Request, res: Response) => {
  res.json({
    message: "Development discontinued",
  });
});
