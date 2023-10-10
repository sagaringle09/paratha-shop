import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import GeneralComponent from "../../components/GeneralComponent/GeneralComponent";
import Header from "../../components/Header/Header";
import ParathaCard from "../../components/ParathaCard/ParathaCard";

const Container = styled.div`
  height: 100vh;
`;
const ContainerBody = styled.div`
  height: calc(100% - 1rem);
  background-color: #1a202c;
  padding-bottom: 1rem;
`;

const ParathaContainer = styled.div`
  max-height: calc(100% - 6.5rem);
  display: flex;
  align-items: center;
  padding: 1rem;
  flex-wrap: wrap;
  background-color: #1a202c;
  overflow: auto;
`;

function Home() {
  const dispatch = useDispatch();
  const [parathaList, setParathaList] = useState([]);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    setLoading(0);
    Promise.all([fetch("http://localhost:3001/ParathaList").then((value) => value.json()), fetch("http://localhost:3001/AddOns").then((value) => value.json()), fetch("http://localhost:3001/ParathasAddOns").then((value) => value.json())])
      .then((data) => {
        if (data[0].length) {
          setParathaList(data[0]);
        }
        if (data[1]) {
          dispatch({ type: "SET_ADD_ON_PRICE", payload: data[1] });
        }
        if (data[2]) {
          dispatch({ type: "SET_PARATHAS_ADD_ON", payload: data[2] });
        }
        setLoading(1);
      })
      .catch((err) => {
        console.error(err);
        setLoading(-1);
      });
  }, []);

  const getContent = () => {
    if (loading === 0) {
      return <GeneralComponent val="Loading" />;
    }
    if (loading === -1) {
      return <GeneralComponent val="Error" />;
    }
    return (
      <ContainerBody>
        <Header />
        <ParathaContainer>
          {parathaList.length > 0 ? (
            parathaList?.map((currItem, idx) => {
              return <ParathaCard details={currItem} key={currItem + idx} />;
            })
          ) : (
            <GeneralComponent val="NoData" />
          )}
        </ParathaContainer>
      </ContainerBody>
    );
  };

  return <Container>{getContent()}</Container>;
}

export default Home;
