import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import postRoutes from "./routes/postRoutes";
import connectDB from "./config/db";
import { globalErrorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const rootDir = path.resolve();

const uploadsDir = path.join(rootDir, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads directory ensured");
}

app.use("/uploads", express.static(uploadsDir));

app.use("/api/posts", postRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Social Media API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
