import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Toppings from "../toppings/Toppings";
import MyModal from "./../Modal/index";
import Counter from "../Counter/Counter";

const Container = styled.div`
  height: 18rem;
  flex: 15%;
  padding: 1rem;
  background-color: #f6f8fa;
  margin: 0.5rem;
  border: solid 1px #f6f8fa;
  box-shadow: 1px 1px 6px #d3d3d3;
  @media (max-width: 767.98px) {
    flex: 100%;
  }
  @media (min-width: 768px) and (max-width: 991.95px) {
    flex: 40%;
  }
  @media (min-width: 992px) and (max-width: 1280px) {
    flex: 25%;
  }
`;
const ContainerTop = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const ContainerCenter = styled.div`
  height: 12rem;
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  & > img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: contain;
  }
`;
const ContainerBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;
const AddToCart = styled.div`
  color: #000000;
  min-width: 3rem;
  font-size: 18px;
  font-weight: bold;
  background-color: #8fcdf4;
  padding: 0.5rem;
  cursor: pointer;
  line-height: 1;
  text-align: center;
  border-radius: 0.5rem;
`;

const ParathaCard = ({ details, isEdit }) => {
  const dispatch = useDispatch();
  const { parathaAddOn: parathaToppings } = useSelector((state) => state?.addOnReducer);
  const toppings = parathaToppings[details?.label] || [];
  const data = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [checkedState, setCheckedState] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const foundIdx = data.items?.findIndex((curr) => curr?.id === details?.label);
    let newAddOnList = [];
    let addOnList = [];
    if (foundIdx !== -1) {
      addOnList = data.items?.[foundIdx].top;
      setCount(data.items?.[foundIdx].count);
    } else {
      setCount(0);
    }
    newAddOnList = toppings.map((curr) => (addOnList.includes(curr) ? true : false));
    setCheckedState(newAddOnList);
  }, [data]);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
  };

  const handleAdd = () => {
    const top = checkedState.reduce((acc, curr, idx) => {
      if (curr) {
        acc.push(toppings[idx]);
      }
      return acc;
    }, []);

    const payload = {
      id: details?.label,
      price: details?.value,
      top,
      count: 1,
    };

    dispatch({ type: "ADD_TO_CART", payload: payload });
    setOpen(false);
  };

  const getContent = () => {
    if (isEdit) {
      return <AddToCart onClick={() => setOpen(true)}>Edit</AddToCart>;
    }
    return (
      <Container>
        <ContainerTop>{details?.label}</ContainerTop>
        <ContainerCenter>
          <img src={require(`../../assets/images/${details.img}`)} alt="NA" />
        </ContainerCenter>
        <ContainerBottom>{count === 0 ? <AddToCart onClick={() => setOpen(true)}>Add to cart</AddToCart> : <Counter count={count} id={details?.label} />}</ContainerBottom>
      </Container>
    );
  };
  return (
    <>
      {getContent()}
      <MyModal title="Add Toppings" open={open} buttonText="Save" onClose={() => setOpen(false)} onSubmit={() => handleAdd()}>
        <Toppings checkedState={checkedState} handleOnChange={handleOnChange} toppings={toppings} />
      </MyModal>
    </>
  );
};

export default ParathaCard;
