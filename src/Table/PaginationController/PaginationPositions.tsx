import React from "react";
import * as PropTypes from "prop-types";
import { getStartPosition, getEndPosition } from "./PaginationControllerHelper";
import { PaginationPositionType } from "../../types/Table/PaginationController";

const PaginationPosition = ({ paginationDetail }: PaginationPositionType) => {
  const { page, rowPerPage, totalRowCount } = paginationDetail;

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
