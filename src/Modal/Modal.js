import "@reach/dialog/styles.css";
import React, { useContext, useRef } from "react";
import * as PropTypes from "prop-types";
import "./Modal.scss";
import { Dialog } from "@reach/dialog";
import FontAwesome from "react-fontawesome";

const getModalSize = (size) => {
  switch (size) {
    case "large":
      return "commonModal--large";
    case "small":
      return "commonModal--small";
    default:
      return "";
  }
};

const CommonModalContext = React.createContext();

const Modal = ({
  className = "",
  style,
  size,
  open,
  onClose,
  disableInitialFocus = false,
  initialFocusRef = null,
  children,
  airaLabel = "Modal",
}) => {
  const dialogRef = useRef(null);

  const modalSize = getModalSize(size);

  return (
    <CommonModalContext.Provider value={{ onClose }}>
      <Dialog
        isOpen={open}
        initialFocusRef={disableInitialFocus ? dialogRef : initialFocusRef}
        onDismiss={onClose}
        className={`commonModal modalSlideDown ${modalSize} ${className}`}
        style={style}
        aria-label={airaLabel}
        ref={dialogRef}
      >
        {children}
      </Dialog>
    </CommonModalContext.Provider>
  );
};

const Header = ({ children, style, className = "", closeButton, ...props }) => {
  const { onClose } = useContext(CommonModalContext);
  return (
    <div
      style={style}
      className={`commonModal__header ${className}`}
      {...props}
    >
      {children}

      {closeButton && (
        <FontAwesome className="closeButton" name="times" onClick={onClose} />
      )}
    </div>
  );
};

const Body = ({ children, style, className = "", ...props }) => {
  return (
    <div style={style} className={`commonModal__body ${className}`} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ children, style, className = "", ...props }) => {
  return (
    <div
      style={style}
      className={`commonModal__footer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

Modal.propTypes = {
  /** The className given to the Modal Container */
  className: PropTypes.string,
  /** The style given to the Modal Container */
  style: PropTypes.object,
  /** Determines the width of the modal */
  size: PropTypes.oneOf(["large", "medium", "small"]),
  /** The boolean controlling whether modal is visible or not */
  open: PropTypes.bool.isRequired,
  /** The function that is called as a boolean is closing */
  onClose: PropTypes.func,
  /** The content rendered inside the modal */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  /**
   * The focus is changed by default to the first focusable element in the modal.
   * If the focus is not wanted at all, set this to true
   */
  disableInitialFocus: PropTypes.bool,
  /**
   * Pass a ref to the desired initialFocus if the default focus is on the wrong element
   */
  initialFocusRef: PropTypes.object,
  /** A string that labels the current element for screen readers */
  airaLabel: PropTypes.string,
};

Header.propTypes = {
  /** The className given to the Modal Header */
  className: PropTypes.string,
  /** The style given to the Modal Header */
  style: PropTypes.object,
  /** Shows an exit icon for the header if prop is present */
  closeButton: PropTypes.bool,
  /** The content rendered inside the modal header */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Body.propTypes = {
  /** The className given to the Modal Body */
  className: PropTypes.string,
  /** The style given to the Modal Body */
  style: PropTypes.object,
  /** The content rendered inside the modal body */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Footer.propTypes = {
  /** The className given to the Modal Footer */
  className: PropTypes.string,
  /** The style given to the Modal footer */
  style: PropTypes.object,
  /** The content rendered inside the modal footer */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Modal;
