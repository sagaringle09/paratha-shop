import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    border: "solid 1px #dddddd",
    backgroundColor: "#00000008",
  },
  paper: {
    width: "35%",
    backgroundColor: "#fafafa",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1.5),
    borderRadius: "10px",
  },
  button: {
    padding: ".5rem 1rem",
    fontSize: "0.75rem",
    fontWeight: "bold",
    borderRadius: "23px",
    backgroundColor: "#e20074",
    color: "#fff",
    letterSpacing: "0",
    lineHeight: "1.4",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#b7015e",
    },
  },
  closeICon: {
    height: "1.5rem",
    weight: "1.5rem",
    marginLeft: `calc(100% - 24px)`,
    cursor: "pointer",
  },
}));
export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;
export const ButtonContainer = styled.div`
  margin: 12px 12px 28px 12px;
  display: flex;
`;
