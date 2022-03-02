import React from "react";
import * as PropTypes from "prop-types";
import styles from "./ControlLabel.module.scss";
import classNames from "classnames/bind";
import ControlLabelType from "../types/ControlLabel";

const cx = classNames.bind(styles);

const ControlLabel = ({
  label,
  children,
  className,
  style,
}: ControlLabelType) => {
  return (
    <div className={className ?? ""} style={style}>
      <div className={cx("label")}>{label}</div>

      {children}
    </div>
  );
};

ControlLabel.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ControlLabel;
