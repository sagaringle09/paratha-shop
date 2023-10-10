import React from "react";
import styled from "styled-components";
import HourglassEmptySharpIcon from "@material-ui/icons/HourglassEmptySharp";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import SpeakerNotesOff from "@material-ui/icons/SpeakerNotesOff";
import DoneIcon from "@material-ui/icons/Done";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  .MuiSvgIcon-root {
    height: 2rem;
    width: 2rem;
  }
`;

const Error = styled(ErrorOutlineIcon)``;

const EmptyData = styled(SpeakerNotesOff)``;
const Done = styled(DoneIcon)`
  svg {
    fill: green;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Label = styled.div`
  font-size: 1.6rem;
  color: #bfc1c7;
  font-weight: 400;
  margin-left: 0.5rem;
`;

const ButtonWrap = styled.div``;

const BackButton = styled.div`
  color: #000000;
  min-width: 2rem;
  font-size: 18px;
  font-weight: bold;
  background-color: #8fcdf4;
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  border-radius: 0.5rem;
  text-transform: capitalize;
  margin-top: 0.5rem;
`;

const Loader = styled(HourglassEmptySharpIcon)`
  @keyframes pulse {
    0% {
      transform: rotate(0deg);
      transform-origin: center center;
    }
    100% {
      transform: rotate(360deg);
      transform-origin: center center;
    }
  }
  animation: pulse 1.1s ease infinite;
`;

const GeneralComponent = ({ val, btnTxt }) => {
  const navigate = useNavigate();
  const getContent = () => {
    if (val === "Loading") return <Loader />;
    if (val === "Error")
      return (
        <ButtonWrap>
          <Wrap>
            <Error />
            <Label>Uh-oh ! Something not right.</Label>
          </Wrap>
          {btnTxt && <BackButton onClick={() => navigate(-1)}>Back</BackButton>}
        </ButtonWrap>
      );
    if (val === "NoData")
      return (
        <ButtonWrap>
          <Wrap>
            <EmptyData />
            <Label>No Data Available</Label>
          </Wrap>
          <BackButton onClick={() => navigate(-1)}>{btnTxt || "Back"}</BackButton>
        </ButtonWrap>
      );
    if (val === "Done")
      return (
        <ButtonWrap>
          <Wrap>
            <Done />
            <Label>Order Successful</Label>
          </Wrap>
          <BackButton onClick={() => navigate("/")}>Home</BackButton>
        </ButtonWrap>
      );
  };

  return <Container>{getContent()}</Container>;
};

export default GeneralComponent;
