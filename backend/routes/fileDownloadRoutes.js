import express, { Router } from "express";
import {
  createDownload,
  getDownloads,
} from "../controllers/fileDownloadController.js";

const router = express.Router();

router.route("/").get(getDownloads).post(createDownload);

export default router;
