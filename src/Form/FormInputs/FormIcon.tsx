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
  className,
  validatedIconName = "check",
  errorIconName = "exclamation-circle",
}) => {
  if (!isValidated) {
    return name ? (
      <div className={`${inputCx("icon")} ${className}`}>
        <FontAwesome name={name} />
      </div>
    ) : null;
  } else {
    if (isError) {
      return (
        <div className={`${inputCx("icon", "icon--error")} ${className}`}>
          <FontAwesome name={errorIconName} />
        </div>
      );
    } else {
      return (
        <div
          className={`${inputCx("icon", {
            "icon--disabled": isDisabled,
          })} ${className}`}
        >
          <FontAwesome name={validatedIconName} />
        </div>
      );
    }
  }
};

export default FormIcon;
