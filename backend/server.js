import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
import { connectDB } from "./config/db.js";
import { router } from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { messageRouter } from "./routes/messageRoutes.js";
import { memberRouter } from "./routes/memberRoutes.js";

// MongoDB connection
connectDB();

const app = express();

// Allow parsing of raw JSON files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", router);
app.use("/api/messages", messageRouter);
app.use("/api/member-status", memberRouter);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
