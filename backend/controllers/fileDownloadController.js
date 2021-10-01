import FileDownload from "../models/downloadModel.js";
import asyncHandler from "express-async-handler";
import path from "path";
const __dirname = path.resolve();

// @desc    FETCH all available downloads
// @route   GET /api/downloads
// @access  Public
const getDownloads = asyncHandler(async (req, res) => {
  const downloads = await FileDownload.find();
  res.json(downloads);
});

// @desc    Create Download
// @route   POST /api/downloads
// @access  Public
const createDownload = asyncHandler(async (req, res) => {
  const { title, originalFile, file } = req.body;

  const download = await FileDownload.create({
    title,
    originalFile,
    file,
  });
  if (download) {
    res.status(201).json({
      _id: download._id,
      title: download.title,
      originalFile: download.originalFile,
      file: download.file,
    });
  } else {
    res.status(400);
    throw new Error("Invalid name or file");
  }
});

export { getDownloads, createDownload };
