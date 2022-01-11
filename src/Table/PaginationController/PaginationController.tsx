import React from "react";
import * as PropTypes from "prop-types";
import PaginationPagesInput from "./PaginationPagesInput";
import PaginationPosition from "./PaginationPositions";
import RowPerPageSelector from "./RowPerPageSelector";
import "./PaginationController.scss";
import { PaginationControllerType } from "../../types/Table/PaginationController";

const PaginationController = (props: PaginationControllerType) => {
  const { paginationDetail, disabled } = props;

  const onPageChange = (page: number) => {
    props.onPaginationChange({ ...paginationDetail, page });
  };

  const onRowPerPageSelect = (rowPerPage: number) => {
    props.onPaginationChange({ ...paginationDetail, rowPerPage });
  };

  return (
    <div className="paginationController">
      <PaginationPagesInput
        paginationDetail={paginationDetail}
        onPageChange={onPageChange}
        disabled={disabled}
      />

      <PaginationPosition paginationDetail={paginationDetail} />

      <RowPerPageSelector
        paginationDetail={paginationDetail}
        onRowPerPageSelect={onRowPerPageSelect}
      />
    </div>
  );
};

PaginationController.propTypes = {
  paginationDetail: PropTypes.object.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default PaginationController;
