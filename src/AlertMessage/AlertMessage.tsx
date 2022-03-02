import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AlertMessage.module.scss";
import AlertMessageType from "../types/AlertMessage";
import FontAwesome from "react-fontawesome";
import { AlertMessageIcon } from "./AlertMessageIcon";

const cx = classNames.bind(styles);

const AlertMessage = ({
  type,
  simplified = false,
  children,
  onClose,
  style,
}: AlertMessageType) => {
  return (
    <div
      style={style}
      className={cx(
        "alertMessageContainer",
        simplified
          ? "alertMessageContainer--simplified"
          : `alertMessageContainer--${type}`
      )}
      role="alert-message"
    >
      <div className={cx("informationContainer")}>
        <div className={cx("icon")}>
          <AlertMessageIcon type={type} />
        </div>
        <div className={cx("text")}>{children}</div>
        {onClose && (
          <button
            aria-label="close"
            className={cx("closeButton")}
            onClick={onClose}
          >
            <FontAwesome name="times fa fa-fw" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertMessage;
