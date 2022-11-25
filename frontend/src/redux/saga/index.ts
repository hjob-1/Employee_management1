import {getEmployeeWatcher,newemployeesWatcher, deleteEmployeeWatcher, updateEmployeeWatcher} from './EmployeeSaga';
import {all, fork } from "redux-saga/effects"


export default function* rootSaga(){
    yield all([fork(getEmployeeWatcher), fork(newemployeesWatcher), fork(deleteEmployeeWatcher),fork(updateEmployeeWatcher)]);
}