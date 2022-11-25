import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const employee = new mongoose.model("employee", employeeSchema);
export default employee;
