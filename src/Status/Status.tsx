import React from "react";
import styles from "./Status.module.scss";
import classNames from "classnames/bind";
import StatusType from "../types/Status";

const cx = classNames.bind(styles);

const Status = ({
  type = "warning",
  children,
  className,
  style,
}: StatusType) => {
  return (
    <div
      className={`${cx("container", type)} ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Status;
