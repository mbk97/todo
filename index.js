import express from "express";
import bodyParser from "body-parser";
import { todoRouter } from "./routes/todo.js";
import dotenv from "dotenv";
import { connectDB } from "./config/config.js";

// remember to use cors

dotenv.config();
connectDB();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8000;

app.use("/api/todos", todoRouter);

app.listen(port, () => {
  console.log(`This server is running on ${port}`);
});
