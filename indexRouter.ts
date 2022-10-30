import * as dotenv from "dotenv";
dotenv.config();
import express, { Router, Request, Response } from "express";
import axios from "axios";
import moment from "moment";

const url_api = process.env.API_URL as string;
// console.log({ url_api });

const fetchDate = async () => {
  let dateToSend;
  await axios
    .get(url_api)
    .then((response) => {
      dateToSend = response?.data[0]?.commit?.author?.date;
      // console.log({ dateToSend });
    })
    .catch((error) => {
      console.log({ error });
    });
  if (dateToSend) {
    dateToSend = new Date(dateToSend);
    dateToSend = moment(dateToSend).fromNow();
    return dateToSend;
  }
};

const indexRouter: Router = express.Router();

indexRouter.get("/", async (req: Request, res: Response) => {
  await console.log("req.ip:", req.ip);
  const lastCommitDate = await fetchDate();
  // await console.log("lastCommitDate:", lastCommitDate);
  await res.render("pages/index", { lastCommitDate: lastCommitDate });
});

indexRouter.get("/*", async (_req: Request, res: Response) => {
  const lastCommitDate = await fetchDate();
  await res.render("pages/notFound", { lastCommitDate: lastCommitDate });
});

export default indexRouter;
