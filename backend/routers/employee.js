import express from "express";
import {
  createEmp,
  deleteEmp,
  getEmps,
  updateEmp,
} from "../controllers/empController.js";

const empRouter = express.Router();

empRouter.post("/create", createEmp);
empRouter.get("/", getEmps);
empRouter.delete("/delete/:_id", deleteEmp);
empRouter.put("/update/:_id", updateEmp);

export default empRouter;
