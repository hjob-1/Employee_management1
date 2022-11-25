import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../redux/store";
import DatePicker from "react-date-picker";
import { employee } from "../types/types";
import { useAppDispatch } from "../redux/hooks";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { date, onChange } from "../types/types";

const Wrapper = styled.div`
  width: 100%;
  background: #ffff;
  height: 100vh;
  a {
    align-self: start;
    margin: 20px;
    letter-spacing: 1px;
  }
`;
const Form = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const InputWrapper = styled.div`
  margin-bottom: 15px;
  width: 400px;
  position: relative;
`;

const DateAndGender = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  gap: 15px;
`;
const Title = styled.h2`
  text-align: center;
  padding: 20px 0px;
  letter-spacing: 2px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border: 1px solid gray;
  border-radius: 5px;
  outline: none;
  &:focus ~ p,
  &:valid ~ p {
    top: -8px;
    background: #ffff;
    font-size: 13px;
    color: #24cec8;
    padding: 0px 4px;
    border-left: 1px solid #24cec8;
    border-right: 1px solid #24cec8;
  }
  &:focus,
  &:valid {
    border: 1px solid #24cec8;
  }
`;

const P = styled.p<date>`
  position: absolute;
  pointer-events: none;
  font-size: ${(props) => (props.date ? "12px" : "14px;")};
  text-transform: uppercase;
  top: ${(props) => (props.date ? "-5px;" : "10px")};
  left: ${(props) => (props.date ? "0px" : "10px;")};
`;
const Button = styled.button`
  background: #fa8937;
  text-align: center;
  border: none;
  outline: none;
  width: 400px;
  padding: 15px;
  border-radius: 7px;
  color: white;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
  margin-top: 10px;
  display: inline-block;
  cursor: pointer;
`;
const Select = styled.select<onChange>`
  width: 100%;
  margin-top: 13px;
  padding: 5px;
`;
const Option = styled.option`
  padding: 10px;
  &:hover {
    background-color: #24cec8;
  }
`;
const Employee = () => {
  const [empData, setempData] = useState<any | employee>();
  const [value] = useState(new Date());
  const [dateofBirth, setdateofBirth] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useSelector((state: RootState) => state.employee);
  const Dispatch = useAppDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      if (id) {
        const found = employee.find((employ: employee) => employ._id === id);
        setempData(found);
      }
    };
    fetchdata();
  }, [employee, id]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (empData)
      setempData({
        ...empData,
        [evt.target.name]: evt.target.value,
      });
    else
      setempData({
        [evt.target.name]: evt.target.value,
      });
  };
  const addEmployee = () => {
    const file = { ...empData, gender: selectedOption, dob: dateofBirth };

    if (!id) {
      if (
        file.gender === "" ||
        file.dob === "" ||
        file.salary === "" ||
        file.full_name === ""
      ) {
        toast.error("The input fields shouldn't be Empty!");
      } else {
        Dispatch({ type: "AddnewEmployee", payload: file });
        toast.success("New Employee succesfully Added");
        setTimeout(() => navigate("/"), 1000);
      }
    } else {
      Dispatch({ type: "updateEmployee", payload: file });
      toast.success("succesfully updated Employee Information");
      setTimeout(() => navigate("/"), 1000);
    }
  };
  return (
    <Wrapper>
      <Title>{id ? "Edit Employee Information" : "New Employee"}</Title>
      <ToastContainer />
      <Form>
        <InputWrapper>
          <Input
            name='full_name'
            type='text'
            required={true}
            value={empData?.full_name}
            onChange={inputHandler}
          />
          <P>full Name</P>
        </InputWrapper>
        <DateAndGender>
          <InputWrapper>
            <P date={true}>date of birth</P>
            <DatePicker
              onChange={(val: any) => {
                let date = val.toString().split(" ").splice(1, 3) + "";
                setdateofBirth(date);
              }}
              value={value}
              className='date'
            />
          </InputWrapper>
          <InputWrapper>
            <P date={true}>gender</P>
            <Select
              name='gender'
              onChange={selectChange}
              value={selectedOption}
            >
              {" "}
              <Option value=''>Choose Gender</Option>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
            </Select>
          </InputWrapper>
        </DateAndGender>
        <InputWrapper>
          <Input
            name='salary'
            type='text'
            required={true}
            value={empData?.salary}
            onChange={inputHandler}
          />
          <P>salary</P>
        </InputWrapper>
        <Button onClick={addEmployee}>
          {id ? "Update Employee" : "Add Employee"}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default Employee;
