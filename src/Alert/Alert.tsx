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
    >
      {showIcon && <FontAwesome name={icon} className={`${cx("icon")}`} />}

      <span className={cx("message")}>{message}</span>

      {onClose && (
        <FontAwesome
          className={cx("closeButton", {
            "closeButton--success": variant === "success",
          })}
          name="times fa fa-fw"
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default Alert;
