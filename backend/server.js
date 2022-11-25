import express from "express";
import mongoose from "mongoose";
import empRouter from "./routers/employee.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/employee", empRouter);
//const mongo = "mongodb://localhost:27017/db_employee";
const mongo = "mongodb://mongodb:27017/db_employee";
mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((e) => console.log(e));
app.listen(4000, () => console.log("listening on port 4000"));
