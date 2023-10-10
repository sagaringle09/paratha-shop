/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Counter from "../Counter/Counter";
import ParathaCard from "../ParathaCard/ParathaCard";
import GeneralComponent from "../GeneralComponent/GeneralComponent";

const ContainerItems = styled.div`
  height: 50vh;
  background-color: #fff;
  box-shadow: 2px 2px 10px #d3d3d3;
  overflow: auto;
`;
const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  &:nth-of-type(even) {
    background-color: #efefef;
  }
  &:nth-of-type(odd) {
    background-color: #c2c2c2;
  }
  @media (max-width: 767.98px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Wrap = styled.div``;
const WrapFlex = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767.98px) {
    width: 100%;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: bold;
`;
const AddOn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 400;
`;

const Price = styled.div`
  width: 5rem;
`;

const DeleteWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Delete = styled(DeleteIcon)`
  height: 1rem;
  width: 1rem;
`;

const CartItem = ({ cartData }) => {
  const dispatch = useDispatch();
  const { addOnPrice: toppingsPrices } = useSelector((state) => state?.addOnReducer);

  const getTopSum = (topArray) => {
    return topArray.reduce((acc, curr) => {
      return acc + toppingsPrices[curr];
    }, 0);
  };

  const getCostOfParatha = (currParatha) => {
    // calculating ADD ON cost
    const topSum = getTopSum(currParatha?.top);
    // calculating each Paratha price with or without add on
    let priceParatha = Number(topSum) + Number(currParatha?.price);
    let cost = Number(priceParatha * currParatha.count);
    return cost || 0;
  };

  const handleDelete = (idx) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: idx });
  };

  return (
    <ContainerItems>
      {cartData?.items.length > 0 ? (
        cartData?.items?.map((currObj, index) => {
          return (
            <ProductDetails key={currObj?.id + index}>
              <WrapFlex>
                <Wrap>
                  <Name>{currObj?.id}</Name>
                  <AddOn>{currObj?.top?.map((curr) => curr + " ")}</AddOn>
                </Wrap>
              </WrapFlex>
              <WrapFlex>
                <Wrap>
                  <Counter count={currObj?.count} id={currObj?.id} />
                </Wrap>
                <DeleteWrap>
                  <ParathaCard details={{ label: currObj?.id, value: currObj?.price }} isEdit />
                </DeleteWrap>
                <Price>{getCostOfParatha(currObj)}</Price>
                <DeleteWrap onClick={() => handleDelete(index)}>
                  <Delete />
                </DeleteWrap>
              </WrapFlex>
            </ProductDetails>
          );
        })
      ) : (
        <GeneralComponent val="NoData" btnTxt={"Add Items"} />
      )}
    </ContainerItems>
  );
};

export default CartItem;
