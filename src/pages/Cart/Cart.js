/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import CheckOutCard from "../../components/CheckOutCard/CheckOutCard";
import GeneralComponent from "../../components/GeneralComponent/GeneralComponent";
import axios from "axios";

const Container = styled.div`
  background-color: #f1f3f6;
  height: 100vh;
  padding: 0 1rem;
`;

const ContainerHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 2rem 0 1rem;
`;

const ClearCart = styled.div`
  color: #000000;
  min-width: 3rem;
  font-size: 18px;
  font-weight: bold;
  background-color: #d3d3d3;
  padding: 0.5rem;
  cursor: pointer;
  line-height: 1;
  text-align: center;
  border-radius: 0.5rem;
`;

const DeliveryDistance = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const ContainerBottom = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 767.98px) {
    flex-direction: column;
  }
`;
const Back = styled.div`
  margin-left: 1rem;
  color: blue;
  cursor: pointer;
`;
const Label = styled.div``;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxCartData = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState({});
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [loading, setLoading] = useState(0);
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/DeliveryChargesList")
      .then((value) => value.json())
      .then((data) => {
        if (data) {
          setDeliveryCharges(data);
        }
        setLoading(1);
      })
      .catch((err) => {
        console.error(err);
        setLoading(-1);
      });
  }, []);

  useEffect(() => {
    setSelectedOption(reduxCartData.deliveryCharge);
    setCartData(reduxCartData);
  }, [reduxCartData, deliveryCharges]);

  const handleChange = (value) => {
    setSelectedOption(value);
    dispatch({ type: "ADD_Delivery", payload: value });
  };

  const handleSubmit = () => {
    setLoading(0);
    axios
      .post("http://localhost:3001/Order", cartData)
      .then((resp) => {
        dispatch({ type: "CLEAR_CART" });
        setLoading("postSuccess");
      })
      .catch((error) => {
        setLoading("postError");
      });
  };

  const getContent = () => {
    if (loading === 0) {
      return <GeneralComponent val="Loading" />;
    }
    if (loading === -1) {
      return <GeneralComponent val="Error" />;
    }
    if (loading === "postSuccess") {
      return <GeneralComponent val="Done" />;
    }
    if (loading === "postError") {
      return <GeneralComponent val="Error" btnTxt="Back" />;
    }

    return (
      <>
        <ContainerHead>
          <div>Cart</div>
          <ClearCart onClick={() => dispatch({ type: "CLEAR_CART" })}>Clear</ClearCart>
        </ContainerHead>
        <CartItem cartData={cartData} />
        {cartData?.items?.length > 0 && (
          <DeliveryDistance>
            <Label>Choose Delivery Location</Label>
            <select style={{ marginLeft: "1rem" }} value={selectedOption} onChange={(e) => handleChange(e.target.value)}>
              {deliveryCharges?.map((o) => (
                <option key={o?.value} value={o?.value}>
                  {o?.label}
                </option>
              ))}
            </select>
          </DeliveryDistance>
        )}
        <ContainerBottom>
          <Back onClick={() => navigate(-1)}>back to shopping</Back>
          <CheckOutCard cartData={cartData} handleSubmit={handleSubmit} />
        </ContainerBottom>
      </>
    );
  };

  return <Container>{getContent()}</Container>;
};

export default Cart;
