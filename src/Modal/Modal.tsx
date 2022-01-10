import "@reach/dialog/styles.css";
import React, { useContext, useRef } from "react";
import {
  ModalType,
  HeaderType,
  BodyType,
  FooterType,
  ModalSize,
} from "../types/Modal";
import styles from "./Modal.module.scss";
import { Dialog } from "@reach/dialog";
import FontAwesome from "react-fontawesome";

const getModalSize = (size: ModalSize) => {
  switch (size) {
    case ModalSize.Large:
      return styles["modal--large"];
    case ModalSize.Small:
      return styles["modal--small"];
    default:
      return "";
  }
};

type ModalDefaultValueType = {
  onClose: React.MouseEventHandler;
};

const ModalContext = React.createContext<ModalDefaultValueType>({
  onClose: () => undefined,
});

const Modal = ({
  className = "",
  style,
  size,
  open,
  onClose,
  disableInitialFocus = false,
  initialFocusRef = undefined,
  children,
  ariaLabel = "Modal",
}: ModalType) => {
  const dialogRef = useRef(null);

  const modalSize = getModalSize(size);

  return (
    <ModalContext.Provider value={{ onClose }}>
      <Dialog
        isOpen={open}
        initialFocusRef={disableInitialFocus ? dialogRef : initialFocusRef}
        onDismiss={onClose}
        className={`${styles.modal} ${modalSize} ${className}`}
        style={style}
        aria-label={ariaLabel}
        ref={dialogRef}
      >
        {children}
      </Dialog>
    </ModalContext.Provider>
  );
};

const Header = ({ children, style, className = "", ...props }: HeaderType) => {
  const { onClose } = useContext(ModalContext);
  return (
    <div style={style} className={`${styles.header} ${className}`} {...props}>
      {children}
      <button
        className={styles.closeButton}
        aria-label="close"
        onClick={onClose}
      >
        <FontAwesome name="times fa fa-fw" />
      </button>
    </div>
  );
};

const Body = ({ children, style, className = "", ...props }: BodyType) => {
  return (
    <div style={style} className={`${styles.content} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ children, style, className = "", ...props }: FooterType) => {
  return (
    <div style={style} className={`${styles.footer} ${className}`} {...props}>
      {children}
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
