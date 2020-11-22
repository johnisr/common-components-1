import React from "react";
import * as PropTypes from "prop-types";
import "./PropTypeRow.css";
import FontAwesome from "react-fontawesome";

function getisRequiredString(type, isRequired) {
  if (isRequired) {
    return `${type}.isRequired`;
  }
  return type;
}

export const PropTypeRow = (props) => (
  <div className="propTypeRow">
    <b>
      {`${props.title} (${getisRequiredString(
        props.type,
        props.isRequired
      )}): `}
    </b>
    {props.description}
    {props.link ? (
      <a href={props.link}>
        {" "}
        <FontAwesome name="external-link" />
      </a>
    ) : null}
  </div>
);

PropTypeRow.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  isRequired: PropTypes.bool,
  description: PropTypes.string,
};

export default PropTypeRow;
