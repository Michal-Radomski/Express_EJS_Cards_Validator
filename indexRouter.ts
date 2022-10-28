import express, { Router, Request, Response } from "express";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("pages/index", {});
});

indexRouter.get("/*", (_req: Request, res: Response) => {
  res.render("pages/notFound", {});
});

export default indexRouter;
