import express from "express";
import cors from "cors";
import knightsRouter from "./routes/knight.routes";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/knightsDb");

app.use("/knights", knightsRouter);
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server up at port: ", port);
});
