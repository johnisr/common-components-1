import React from "react";
import classNames from "classnames/bind";
import styles from "./Alert.module.scss";
import AlertType from "../types/Alert";
import { getAlertStyling } from "./AlertHelper";
import FontAwesome from "react-fontawesome";

const cx = classNames.bind(styles);

const Alert = ({
  className = "",
  style,
  variant = "notification",
  showIcon = true,
  message,
  onClose,
}: AlertType) => {
  const { className: variantClassName, icon } = getAlertStyling(variant);

  return (
    <div
      className={`${cx("alert", variantClassName, {
        "alert--truncated": showIcon,
      })} ${className}`}
      style={style}
      role="alert"
    >
      {showIcon && <FontAwesome name={icon} className={`${cx("icon")}`} />}

      <span className={cx("message")} role="text" aria-label="message">
        {message}
      </span>

      {onClose && (
        <button
          className={cx("closeButton", {
            "closeButton--success": variant === "success",
          })}
          aria-label="close"
          onClick={onClose}
        >
          <FontAwesome name="times fa fa-fw" />
        </button>
      )}
    </div>
  );
};

export default Alert;
