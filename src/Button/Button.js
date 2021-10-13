import React from "react";
import * as PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "./Button.css";

const getTypeClassName = (type) => {
  switch (type) {
    case "primary":
      return "commonPrimaryButton";
    case "danger":
      return "commonDangerButton";
    default:
      return "commonDefaultButton";
  }
};

const getIcon = (isLoading, icon, iconClassName) => {
  if (isLoading) {
    return <FontAwesome name="spinner" className="loadingIcon fa-pulse" />;
  } else if (icon) {
    return <FontAwesome name={icon} className={`${iconClassName}`} />;
  }

  return null;
};

const Button = ({
  className = "",
  style,
  type,
  onClick,
  disabled,
  icon,
  iconClassName = "",
  isLoading,
  outline,
  isSubmit,
  children,
}) => {
  const typeClassName = getTypeClassName(type);

  const buttonIcon = getIcon(isLoading, icon, iconClassName);

  return (
    <button
      className={`commonButton ${typeClassName} ${
        outline ? "buttonOutline" : ""
      } ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
      style={style}
      type={isSubmit ? "submit" : "button"}
    >
      <>
        {buttonIcon}

        <span className={buttonIcon ? "commonButton__iconMargin" : ""}>
          {children}
        </span>
      </>
    </button>
  );
};

Button.propTypes = {
  /** The className given to the button */
  className: PropTypes.string,
  /** The style given to the button */
  style: PropTypes.object,
  /** Gives preset styling options ("primary", "danger", "default") for the color, background-color, and text */
  type: PropTypes.string,
  /** If true, adds a border around the button */
  outline: PropTypes.bool,
  /** The function executed when clicking a button */
  onClick: PropTypes.func.isRequired,
  /** If true, the button will become greyed-out and not responsive to actions */
  disabled: PropTypes.bool,
  /** The FontAwesome icon name to show the icon */
  icon: PropTypes.string,
  /** Any styling needed to apply to the icon specifically can be added via className */
  iconClassName: PropTypes.string,
  /** The content of the button */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Shows a loader in the button as well as greying out the button */
  isLoading: PropTypes.bool,
  isSubmit: PropTypes.bool,
};

export default Button;
