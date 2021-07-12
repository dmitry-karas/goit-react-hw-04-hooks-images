import React, { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { GiCrossMark } from "react-icons/gi";
import { Overlay, ModalWindow, CloseButton, Image } from "./Modal.styled";
import { Spinner } from "../Spinner/Spinner";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.objectOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = { loaded: false };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const { onClose } = this.props;

    if (e.code === "Escape") {
      onClose();
    }
  };

  handleOverlayClick = (e) => {
    const { onClose } = this.props;

    if (e.target !== e.currentTarget) {
      return;
    }

    onClose();
  };

  handleImageLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { image, onClose } = this.props;
    const { loaded } = this.state;

    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWindow>
          <Image
            src={image.src}
            alt={image.alt}
            onLoad={this.handleImageLoaded}
          />
          {loaded ? (
            <CloseButton onClick={onClose}>
              <GiCrossMark size="30" />
            </CloseButton>
          ) : (
            <Spinner />
          )}
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
