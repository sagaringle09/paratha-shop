import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  background-color: #00a4c3;
`;
const ContainerLeft = styled.div``;
const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const CartIcon = styled(ShoppingCartIcon)`
  height: 2rem;
  width: 2rem;
  cursor: pointer;
`;
const Badge = styled.div`
  display: flex;
  position: absolute;
  background: #ca2a22;
  color: #ffffff;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  top: -7px;
  left: 10px;
  font-weight: bold;
`;

const Header = () => {
  const navigate = useNavigate();
  const reduxCartData = useSelector((state) => state.cart);
  const [count, setCount] = useState();
  useEffect(() => {
    setCount(reduxCartData.itemCount);
  }, [reduxCartData]);
  return (
    <Container>
      <ContainerLeft>Paratha</ContainerLeft>
      <ContainerRight onClick={() => navigate("/cart")}>
        <CartIcon />
        {count !== 0 && <Badge>{count}</Badge>}
      </ContainerRight>
    </Container>
  );
};

export default Header;
