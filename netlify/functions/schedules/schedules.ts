import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { insertSchedule } from "./insertSchedule";

export const app = express();
app.use(express.json());
const router = express.Router();
app.use(`/.netlify/functions/schedules`, router);
export const handler = serverless(app);

router.post("/:eventId", async (req: Request, res: Response) => {
  const results = await insertSchedule(req.params.eventId, req.body);
  res.status(results.statusCode).json(results.body);
});
