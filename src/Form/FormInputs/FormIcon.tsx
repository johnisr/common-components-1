import React from "react";
import FontAwesome from "react-fontawesome";
import classNames from "classnames/bind";
import styles from "./FormIcon.module.scss";
import FormIconType from "../../types/Form/FormIcon";

const inputCx = classNames.bind(styles);

const FormIcon: React.FC<FormIconType> = ({
  isValidated,
  isError,
  isDisabled,
  name,
}) => {
  if (!isValidated) {
    return name ? (
      <div className={inputCx("icon")}>
        <FontAwesome name={name} />
      </div>
    ) : null;
  } else {
    if (isError) {
      return (
        <div className={inputCx("icon", "icon--error")}>
          <FontAwesome name="exclamation-circle" />
        </div>
      );
    } else {
      return (
        <div className={inputCx("icon", { "icon--disabled": isDisabled })}>
          <FontAwesome name="check" />
        </div>
      );
    }
  }
};

export default FormIcon;
