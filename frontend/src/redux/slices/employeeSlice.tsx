import { createSlice } from "@reduxjs/toolkit";
import { employee, res, state_interface, empdelete } from "../../types/types";

const initialState: state_interface = {
  employee: [
    {
      _id: "1",
      full_name: "eyob tadele",
      salary: 4000,
      dob: "20 dec 2020",
      gender: "male",
    },
  ],
  filtered: [
    {
      _id: "1",
      full_name: "eyob tadele",
      salary: 4000,
      dob: "20 dec 2020",
      gender: "male",
    },
  ],
  loading: false,
  error: false,
  success: false,
  message: "",
  len: 1,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fetchEmployeesSlice: (state, action) => {
      state.loading = action.payload;
    },
    getEmployeesSlice: (state, action) => {
      return state;
    },
    filterEmployee: (state, action) => {
      const { full_name, _id, gender } = action.payload;

      if (_id.length !== 0) {
        state.filtered = state.employee.filter((emp) =>
          emp._id.slice(-4).includes(_id)
        );
      } else if (full_name || gender) {
        state.filtered = state.employee.filter((emp) => {
          if (full_name && gender === "") {
            if (
              !emp.full_name.toLowerCase().startsWith(full_name.toLowerCase())
            )
              return false;
          } else if (gender && full_name === "") {
            if (emp.gender !== gender) return false;
          } else if (gender && full_name) {
            if (
              !emp.full_name
                .toLowerCase()
                .startsWith(full_name.toLowerCase() || emp.gender !== gender)
            )
              return false;
          }
          return emp;
        });
      } else {
        state.filtered = [...state.employee];
      }
      return state;
    },
    setEmployeesSlice: (
      state,
      action: { payload: { employees: employee[]; len: number }; type: string }
    ) => {
      state.employee = [...action.payload.employees];
      state.len = action.payload.len;
      state.filtered = [...action.payload.employees];
      return state;
    },
    newEmployeeSlice: (state, action: { payload: res; type: string }) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      return state;
    },
    deleteEmployeeSlice: (
      state,
      action: { payload: empdelete; type: string }
    ) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      const index = state.filtered.findIndex(
        (emp) => emp._id === action.payload._id
      );
      state.filtered.splice(index, 1);
      state.employee.splice(index, 1);
      return state;
    },
    updateEmployeeSlice: (state, action: { payload: res; type: string }) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      return state;
    },
  },
});

export const {
  fetchEmployeesSlice,
  getEmployeesSlice,
  newEmployeeSlice,
  setEmployeesSlice,
  deleteEmployeeSlice,
  updateEmployeeSlice,
  filterEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
