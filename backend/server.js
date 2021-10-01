import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";

import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import fileDownloadRoutes from "./routes/fileDownloadRoutes.js";
import singleDownloadRoutes from "./routes/singleDownloadRoutes.js";
import testRoute from "./routes/testRoute.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/downloads", fileDownloadRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/download", singleDownloadRoutes);
app.use("/api/test", testRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server is running on port ${PORT}`.green.bold));
