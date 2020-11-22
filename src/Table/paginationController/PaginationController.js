import React from "react";
import * as PropTypes from "prop-types";
import PaginationPagesInput from "./PaginationPagesInput";
import PaginationPosition from "./PaginationPositions";
import RowPerPageSelector from "./RowPerPageSelector";
import "./PaginationController.scss";

const PaginationController = (props) => {
  const { paginationDetail } = props;

  const onPageChange = (page) => {
    props.onPaginationChange({ ...paginationDetail, page });
  };

  const onRowPerPageSelect = (rowPerPage) => {
    props.onPaginationChange({ ...paginationDetail, rowPerPage });
  };

  return (
    <div className="paginationController">
      <PaginationPagesInput
        paginationDetail={paginationDetail}
        onPageChange={onPageChange}
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
};

export default PaginationController;
