import styled from "styled-components";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { employee } from "../types/types";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  a {
    margin-bottom: 20px;
  }
  thead th {
    color: #6b728e;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    height: 40px;
  }
  td {
    text-align: center;
    padding: 15px;
    font-size: 16px;
  }
  .even {
    background: #f7f7f7;
  }
`;
const Tablewrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  background-color: #ffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  a {
    margin-bottom: 20px;
    letter-spacing: 1px;
    text-decoration: none;
  }
`;

type Props = {
  employee: employee[];
};

const Lists = (prop: Props) => {
  const { employee } = prop;

  const dispatch = useDispatch();

  const deleteEmployee = async (_id: string) => {
    try {
      if (window.confirm("Are you sure you want to proceed ?")) {
        dispatch({ type: "deleteEmployee", payload: _id });
        toast.success("Succesfully Deleted");
      }
    } catch (e) {
      toast.error("Error while deleting employee, try again.!");
    }
  };

  return (
    <Tablewrapper>
      <ToastContainer />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name </th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((emp, index) => (
            <tr key={emp._id} className={index % 2 === 1 ? "odd" : "even"}>
              <td>{emp._id.slice(-4)}</td>
              <td>{emp.full_name}</td>
              <td>{emp.gender}</td>
              <td>{emp.dob}</td>
              <td>{emp.salary}</td>
              <td>
                <span style={{ marginRight: "15px", cursor: "pointer" }}>
                  <Link to={`/update/${emp._id}`}>
                    <FiEdit3 />
                  </Link>
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteEmployee(emp._id)}
                >
                  <AiOutlineDelete />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Tablewrapper>
  );
};

export default Lists;
