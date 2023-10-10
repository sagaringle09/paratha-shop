import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 1rem;
`;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Toppings = ({ checkedState, handleOnChange, toppings }) => {
  return (
    <Container>
      {toppings.map((label, index) => {
        return (
          <Wrap key={index + label + index}>
            <Name>{label}</Name>
            <InputDiv>
              <input type="checkbox" name={label} value={label} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
            </InputDiv>
          </Wrap>
        );
      })}
    </Container>
  );
};

export default Toppings;
