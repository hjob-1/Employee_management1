import Filter from "../components/Filter";
import Lists from "../components/Lists";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchEmployeesSlice,
  getEmployeesSlice,
} from "../redux/slices/employeeSlice";
import { ToastContainer } from "react-toastify";
import { TablePagination } from "@mui/material";

const HomeWrapper = styled.div`
  width: 75%;
  margin: 30px auto;
`;
const Title = styled.h2`
  text-align: center;
  letter-spacing: 2px;
  margin-bottom: 20px;
  color: #6b728e;
`;

const Home = () => {
  const { loading, len, filtered } = useAppSelector(
    (state: RootState) => state.employee
  );

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployeesSlice(true));
    dispatch(
      getEmployeesSlice({
        page: controller.page,
        limit: controller.rowsPerPage,
      })
    );
    dispatch(fetchEmployeesSlice(false));
  }, [controller, dispatch]);

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <HomeWrapper>
      <Title>Employee Management</Title>
      <Filter />
      <ToastContainer />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Lists employee={filtered} />
          <TablePagination
            component='div'
            onPageChange={handlePageChange}
            page={controller.page}
            count={len}
            rowsPerPage={controller.rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </HomeWrapper>
  );
};

export default Home;
