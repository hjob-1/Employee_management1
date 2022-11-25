import { useDispatch } from "react-redux";
import styled from "styled-components";
import { filterEmployee } from "../redux/slices/employeeSlice";
import { useState } from "react";

type Props = {
  filter: boolean;
  setFilter: (params: boolean) => void;
};

const Wrapper = styled.div`
  margin: 20px 0px;
  background-color: #ffff;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;
const Input = styled.div`
  p {
    margin-bottom: 5px;
    color: gray;
    font-size: 14px;
  }
  input,
  select {
    padding: 6px;
    outline: none;
  }
  input:focus,
  select:focus {
    border: 1.5px solid #2174c9;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ActionWrapper = styled.div`
  text-align: right;
  margin-top: 30px;
`;

interface values {
  readonly bg?: string;
  readonly br?: boolean;
}
const Button = styled.button<values>`
  padding: 10px 20px;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: ${(props) => props.br && "7px"};
  background: ${(props) => (props.bg ? props.bg : "white")};
  color: ${(props) => (props.bg ? "white" : "#2174C9")};
`;

const Collapsable = (props: Props) => {
  const { filter, setFilter } = props;
  const [full_name, setFullName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [_id, setId] = useState<string>("");

  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch(filterEmployee({ full_name, gender, _id }));
    console.log(full_name, _id, gender);
  };

  return (
    <>
      {filter && (
        <Wrapper>
          <InputWrapper>
            <Input>
              <p>ID</p>
              <input
                type='text'
                placeholder='Enter ID'
                value={_id}
                onChange={(e) => setId(e.target.value)}
              />
            </Input>
            <Input>
              <p>Name</p>
              <input
                type='text'
                placeholder='Enter Name'
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Input>
            <Input>
              <p>Gender</p>
              <select
                defaultValue={gender}
                onChange={(evt) => setGender(evt.target.value)}
              >
                <option value=''>Choose Gender</option>
                <option value='male'> Male</option>
                <option value='female'>Female</option>
              </select>
            </Input>
            <Input>
              <p>Salary</p>
              <input type='text' placeholder='Enter ID' />
            </Input>
          </InputWrapper>
          <ActionWrapper>
            <Button onClick={() => setFilter(!filter)}>Collapse Filter</Button>
            <Button bg='#2174C9' br={true} onClick={handleFilter}>
              Search
            </Button>
          </ActionWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default Collapsable;
