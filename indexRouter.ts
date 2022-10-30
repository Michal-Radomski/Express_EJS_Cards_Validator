import * as dotenv from "dotenv";
dotenv.config();
import express, { Router, Request, Response } from "express";
import axios from "axios";

const url_api = process.env.API_URL as string;
// console.log({ url_api });

const indexRouter: Router = express.Router();

indexRouter.get("/", async (req: Request, res: Response) => {
  await console.log("req.ip:", req.ip);

  await axios
    .get(url_api)
    .then((response) => {
      const dateToSend = response.data[0].commit.author.date;
      // console.log({ dateToSend });
      // return dateToSend;
      res.render("pages/index", { lastCommitDate: dateToSend });
    })
    .catch((error) => {
      console.log({ error });
    });
});

indexRouter.get("/*", (_req: Request, res: Response) => {
  res.render("pages/notFound", {});
});

export default indexRouter;
