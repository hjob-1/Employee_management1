import employee from "../models/employee.js";

const createEmp = async (req, res) => {
  try {
    const newuser = await employee.create(req.body);
    newuser.save();
    res
      .status(200)
      .send({ success: true, message: "New Employee succesfully added" });
  } catch (e) {
    res.status(300).send({ success: false, message: "try again" });
  }
};

const getEmps = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const allemp = await employee
      .find({})
      .skip(page * limit)
      .limit(limit)
      .lean()
      .exec();

    const len = await employee.count();

    if (allemp) res.send({ allemp, len });
    else res.send({ message: "Add new Employee" });
  } catch (e) {
    res.send(404).send({ message: "error while fetching" });
  }
};
const deleteEmp = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);

    if (_id) {
      const emp = await employee.findByIdAndDelete(_id);
      if (emp)
        res.status(200).send({ success: true, message: "Succesfully Deleted" });
      else
        res.status(500).send({
          success: false,
          message: "Employee doesn't Existed, try again",
        });
    } else
      res.send({ success: false, message: "Employer id should be specified" });
  } catch (e) {
    res.send({ success: false, message: "Error while deleting employee" });
  }
};
const updateEmp = async (req, res) => {
  try {
    const updatedemp = await employee.findByIdAndUpdate(req.params._id, {
      ...req.body,
    });
    console.log("updated hiited");
    if (updatedemp)
      res.status(200).send({
        success: true,
        message: "succesfully updated Employee Information",
      });
    else
      res.status(500).send({
        success: false,
        message: "Can't updated Employee Information, try again!",
      });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "can't updated Employee Information, try again!",
    });
  }
};

export { createEmp, getEmps, deleteEmp, updateEmp };
