import React from "react";
import classNames from "classnames/bind";
import styles from "./CheckboxButton.module.scss";
import FontAwesome from "react-fontawesome";
import { getSizeClassName } from "./CheckboxButtonHelper";
import CheckboxButtonType from "../types/CheckboxButton";

const cx = classNames.bind(styles);

const CheckboxButton = ({
  className = "",
  style,
  name = "checkbox",
  children,
  value: checked = false,
  isDisabled = false,
  inputRef,
  onChange,
  onBlur,
  isOutline = false,
  size = "small",
}: CheckboxButtonType) => {
  const sizeClassName = getSizeClassName(size);

  return (
    <label
      className={`${cx("container", sizeClassName, {
        "container--checked": checked && !isOutline,
        "container--disabled": isDisabled,
      })} ${className ?? ""}`}
      style={style}
      htmlFor={name}
    >
      <span className="fa-stack">
        <FontAwesome
          className={cx("iconCircle", {
            "iconCircle--checked": checked,
            "iconCircle--outline": isOutline && checked,
          })}
          name={checked ? "circle" : "circle-o"}
          stack="2x"
        />

        {checked && (
          <FontAwesome
            name="check"
            className={`fa-stack-1x ${cx("icon", {
              "icon--outline": isOutline,
            })}`}
          />
        )}
      </span>

      <input
        className={cx("checkbox")}
        type="checkbox"
        id={name}
        checked={checked}
        ref={inputRef}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isDisabled}
      />

      <span
        className={cx("label", {
          "label--checked": checked && !isOutline,
          "label--disabled": isDisabled,
        })}
      >
        {children}
      </span>
    </label>
  );
};

export default CheckboxButton;
