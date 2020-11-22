import React from "./node_modules/react";
import * as PropTypes from "./node_modules/prop-types";
import { getStartPosition, getEndPosition } from "./PaginationControllerHelper";

const PaginationPosition = (props) => {
  const { page, rowPerPage, totalRowCount } = props.paginationDetail;

  const startPosition = getStartPosition(page, rowPerPage);

  const endPosition = getEndPosition(startPosition, rowPerPage, totalRowCount);

  return (
    <div className="paginationPosition">{`${startPosition} - ${endPosition} of ${totalRowCount}`}</div>
  );
};

PaginationPosition.propTypes = {
  paginationDetail: PropTypes.object.isRequired,
};

export default PaginationPosition;
