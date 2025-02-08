import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { insertSchedule } from "../schedule/insertSchedule";

export const app = express();
app.use(express.json());
const router = express.Router();
app.use(`/.netlify/functions/schedules`, router);
export const handler = serverless(app);

router.post("/:event_id", async (req: Request, res: Response) => {
  const results = await insertSchedule(req.params.event_id, req.body);
  res.status(results.statusCode).json(results.body);
});
