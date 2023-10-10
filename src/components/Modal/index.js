/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { PropTypes } from "prop-types";
import { Fade, Modal, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles, Title, ButtonContainer } from "./styles";

const MyModal = (props) => {
  const classes = useStyles();
  const { open, modalStyle, title, children, buttonText, onClose, onSubmit } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      disableBackdropClick
      BackdropProps={{
        timeout: 200,
      }}
      disablePortal
      disableEnforceFocus
    >
      <Fade in={open}>
        <div className={classes.paper} style={modalStyle.container}>
          <CloseIcon className={classes.closeICon} style={modalStyle.closeIcon} onClick={onClose} />
          <Title style={modalStyle.title}>{title}</Title>
          {children || ""}
          <ButtonContainer style={modalStyle.buttonContainer}>
            <Button style={modalStyle.button} onClick={onSubmit} fullWidth disableElevation className={classes.button}>
              <p>{buttonText}</p>
            </Button>
          </ButtonContainer>
        </div>
      </Fade>
    </Modal>
  );
};
MyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  modalStyle: PropTypes.object,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};
MyModal.defaultProps = {
  modalStyle: {
    container: {},
    title: {},
    closeIcon: {},
    buttonContainer: {},
    button: {},
  },
  title: "",
  // eslint-disable-next-line react/default-props-match-prop-types
  subtitle: "",
  buttonText: "Confirm",
  onSubmit: () => "",
  onClose: () => "",
};
export default MyModal;
