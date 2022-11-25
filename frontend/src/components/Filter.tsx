import React, { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineFilter } from "react-icons/ai";
import styled from "styled-components";
import Collapsable from "./Collapsable";
import { Link } from "react-router-dom";

type Props = {};

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    color: #6b728e;
  }
`;
const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FilterAction = styled.div`
  padding: 8px;
  margin-right: 20px;
  border-radius: 7px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
`;

const NewEmployee = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #2174c9;
  color: white;
  border-radius: 7px;
  transition: all ease 0.5s;
  span {
    margin-left: 10px;
  }
  &:hover {
    border: 2px solid #2174c9;
    color: black;
    background-color: #ffff;
    padding: 8px;
  }
`;

const Filter = (props: Props) => {
  const [isFilterActive, SetisFilterActive] = useState<boolean>(false);

  const handleFilter = () => SetisFilterActive((prev) => !prev);

  const styles = isFilterActive
    ? { color: "#ffff", background: "#2174c9", border: "2px solid #2174c9" }
    : { color: "#2174c9", background: "#ffff", border: "2px solid #2174c9" };

  return (
    <div style={{ background: "#F7F7F7" }}>
      <FilterWrapper>
        <h3>Employees</h3>
        <RightWrapper>
          <FilterAction style={{ ...styles }} onClick={handleFilter}>
            <AiOutlineFilter />
          </FilterAction>
          <Link to='/add'>
            <NewEmployee>
              <IoPersonAddOutline />
              <span>New Employees</span>
            </NewEmployee>
          </Link>
        </RightWrapper>
      </FilterWrapper>
      <Collapsable filter={isFilterActive} setFilter={SetisFilterActive} />
    </div>
  );
};

export default Filter;
