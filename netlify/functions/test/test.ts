import express, { Request, Response } from "express";
import serverless from "serverless-http";

export const app = express();
const router = express.Router();
app.use(`/.netlify/functions/test`, router);
export const handler = serverless(app);

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

router.get("/hi/:name", (req: Request, res: Response) => {
  res.json({
    message: `Hi! ${req.params.name}`,
  });
});

