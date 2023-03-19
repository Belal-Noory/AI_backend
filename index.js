import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import db from "./db/db.js";
import { errorHandler, notFound } from "./middleware/error.js";

dotenv.config();
const app = express();
let port = process.env.PORT || 5000;

app.use(cors({
  credentials: true
}));
app.use(express.json());
db;

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on the Port ${port}`);
});

