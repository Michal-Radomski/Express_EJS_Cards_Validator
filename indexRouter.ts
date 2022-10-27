import express, { Router, Request, Response } from "express";

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("pages/index", {});
});

export default indexRouter;
