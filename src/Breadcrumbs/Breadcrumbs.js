import React from "react";
import FontAwesome from "react-fontawesome";
import * as PropTypes from "prop-types";
import "./Breadcrumbs.css";

const Breadcrumb = (props) => {
  return (
    <button
      className="common__breadcrumb"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {!props.isFirstBreadcrumb && (
        <FontAwesome className="icon" name="angle-right" />
      )}

      <span
        style={
          !props.isLastBreadcrumb ? { color: "#2196f3" } : { cursor: "default" }
        }
      >
        {props.title}
      </span>
    </button>
  );
};

const Breadcrumbs = (props) => {
  return props.breadcrumbs?.length ? (
    <div
      className={`common__breadcrumbs ${props.className || ""}`}
      style={props.style}
    >
      {props.breadcrumbs.map(({ title, onClick }, index) => {
        const isLastBreadcrumb = index === props.breadcrumbs.length - 1;
        const isFirstBreadcrumb = index === 0;

        return (
          <Breadcrumb
            key={title}
            title={title}
            onClick={onClick}
            disabled={isLastBreadcrumb}
            isFirstBreadcrumb={isFirstBreadcrumb}
            isLastBreadcrumb={isLastBreadcrumb}
          />
        );
      })}
    </div>
  ) : null;
};

Breadcrumb.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isFirstBreadcrumb: PropTypes.bool,
  isLastBreadcrumb: PropTypes.bool,
};

Breadcrumbs.propTypes = {
  /** An array of { title, onClick } objects, with title being what is displayed
   *  and onClick the function called when the breadcrumb is clicked
   */
  breadcrumbs: PropTypes.array,
  /** The className applied to the containing div */
  className: PropTypes.string,
  /** Determines the default inline style of the containing div */
  style: PropTypes.object,
};

export default Breadcrumbs;
