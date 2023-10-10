/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useDispatch } from "react-redux";

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 1rem;
  cursor: pointer;
  margin: 0.5rem;
`;

const AddMore = styled(AddIcon)`
  height: 1rem;
  width: 1rem;
`;
const Remove = styled(RemoveIcon)`
  height: 1rem;
  width: 1rem;
`;

const CountValue = styled.div``;

const Counter = ({ count, id }) => {
  const dispatch = useDispatch();

  return (
    <CounterContainer>
      <StyledIcon onClick={() => dispatch({ type: "MINUS_CART_ITEM", payload: id })}>
        <Remove />
      </StyledIcon>
      <CountValue>{count}</CountValue>
      <StyledIcon onClick={() => dispatch({ type: "PLUS_CART_ITEM", payload: id })}>
        <AddMore />
      </StyledIcon>
    </CounterContainer>
  );
};

export default Counter;
