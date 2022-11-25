import { takeLatest, put, call } from "redux-saga/effects";
import { employee, res } from "../../types/types";

import {
  setEmployeesSlice,
  newEmployeeSlice,
  getEmployeesSlice,
  deleteEmployeeSlice,
  updateEmployeeSlice,
} from "../slices/employeeSlice";
import { employees } from "../../services/fetchers";

const { getEmployes, deleteEmployee, updateEmployee, createEmployee } =
  employees;

//saga middlewares
function* getEmployeesSaga(action: {
  payload: { page: number; limit: number };
  type: string;
}) {
  const response: { allemp: employee[]; len: number } = yield call(
    getEmployes,
    action.payload.page,
    action.payload.limit
  );
  yield put(
    setEmployeesSlice({ employees: response.allemp, len: response.len })
  );
}

function* newEmployeeSaga(action: { payload: employee; type: string }) {
  console.log(action.payload);
  const response: res = yield call(createEmployee, action.payload);
  yield put(newEmployeeSlice(response));
}

function* deleteEmployeeSaga(action: { payload: string; type: string }) {
  const response: res = yield call(deleteEmployee, action.payload);
  const respo = { ...response, _id: action.payload };
  yield put(deleteEmployeeSlice(respo));
}

function* updateEmployeeSaga(action: { payload: employee; type: string }) {
  const response: res = yield call(updateEmployee, action.payload);
  yield put(updateEmployeeSlice(response));
}

//all watchers
function* newemployeesWatcher() {
  yield takeLatest("AddnewEmployee", newEmployeeSaga);
}

function* getEmployeeWatcher() {
  yield takeLatest(getEmployeesSlice, getEmployeesSaga);
}

function* deleteEmployeeWatcher() {
  yield takeLatest("deleteEmployee", deleteEmployeeSaga);
}

function* updateEmployeeWatcher() {
  yield takeLatest("updateEmployee", updateEmployeeSaga);
}

export {
  newemployeesWatcher,
  getEmployeeWatcher,
  deleteEmployeeWatcher,
  updateEmployeeWatcher,
};
