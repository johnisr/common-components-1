import React from "./node_modules/react";
import * as PropTypes from "./node_modules/prop-types";
import "./PaginationController.scss";
import { DropdownButton, MenuItem } from "./node_modules/react-bootstrap";
import { ROW_PER_PAGE_OPTIONS } from "./PaginationControllerConstant";

const RowPerPageSelector = (props) => {
  const { rowPerPage } = props.paginationDetail;

  const onSelect = (eventKey) => {
    props.onRowPerPageSelect(eventKey);
  };

  return (
    <div className="rowPerPageSelector">
      Row per page:
      <DropdownButton
        id="rowPerPageSelector__button"
        className="rowPerPageSelector__button"
        onSelect={onSelect}
        title={rowPerPage}
        dropup
      >
        {ROW_PER_PAGE_OPTIONS.map((option) => (
          <MenuItem key={option} eventKey={option}>
            {option}
          </MenuItem>
        ))}
      </DropdownButton>
    </div>
  );
};

RowPerPageSelector.propTypes = {
  paginationDetail: PropTypes.object.isRequired,
  onRowPerPageSelect: PropTypes.func.isRequired,
};

export default RowPerPageSelector;
