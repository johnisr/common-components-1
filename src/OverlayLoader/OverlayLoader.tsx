import React from "react";
import * as PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import classNames from "classnames/bind";
import moduleStyles from "./OverlayLoader.module.scss";
import OverlayLoaderType from "../types/OverlayLoader";

const cx = classNames.bind(moduleStyles);

const OverlayLoader = ({ text }: OverlayLoaderType) => {
  return (
    <div className={cx("overlayLoader")}>
      <div className={cx("message")}>
        <FontAwesome name="cog" className={cx("icon")} spin />

        {text}
      </div>
    </div>
  );
};

export default OverlayLoader;
