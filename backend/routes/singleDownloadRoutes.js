import express from "express";
import path from "path";
import FileDownload from "../models/downloadModel.js";

const router = express.Router();

const __dirname = path.resolve();

router.get("/:id", (req, res) => {
  FileDownload.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var path = __dirname + data[0].file;
      res.download(path);
    }
  });
});

export default router;
