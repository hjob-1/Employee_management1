import { configureStore, MiddlewareArray} from "@reduxjs/toolkit";
import employee from "./slices/employeeSlice";
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../redux/saga/index'
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    employee: employee,
  },
 middleware:new MiddlewareArray().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
