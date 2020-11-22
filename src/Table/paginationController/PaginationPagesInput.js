import React, { useState } from "./node_modules/react";
import * as PropTypes from "./node_modules/prop-types";
import "./PaginationController.scss";
import { FormControl, Button } from "./node_modules/react-bootstrap";
import FontAwesome from "./node_modules/react-fontawesome";
import { validatePageNumber } from "./PaginationControllerHelper";
import { MIN_PAGE_NUMBER } from "./PaginationControllerConstant";

const PaginationPagesInput = (props) => {
  const { page, totalRowCount, rowPerPage } = props.paginationDetail;

  const [pageInput, setPageInput] = useState(page);
  const maxPageNumber = Math.ceil(totalRowCount / rowPerPage);

  const onInputChange = (newPageNumber) => {
    newPageNumber = validatePageNumber(
      newPageNumber,
      maxPageNumber,
      MIN_PAGE_NUMBER
    );

    setPageInput(newPageNumber);
  };

  const onButtonClick = (newPageNumber) => {
    newPageNumber = validatePageNumber(
      newPageNumber,
      maxPageNumber,
      MIN_PAGE_NUMBER
    );
    setPageInput(newPageNumber);

    props.onPageChange(newPageNumber);
  };

  const onInputLeave = () => {
    if (pageInput !== page) {
      props.onPageChange(pageInput);
    }
  };

  return (
    <div className="paginationPage">
      <Button
        className="paginationPage__button"
        disabled={page === MIN_PAGE_NUMBER}
        onClick={() => onButtonClick(page - 1)}
      >
        <FontAwesome name="caret-left" />
      </Button>

      <FormControl
        className="paginationPage__input"
        type="number"
        onChange={(event) => onInputChange(event.target.value)}
        onBlur={() => onInputLeave(pageInput)}
        value={pageInput}
      />

      <Button
        className="paginationPage__button"
        disabled={page === maxPageNumber}
        onClick={() => onButtonClick(page + 1)}
      >
        <FontAwesome name="caret-right" />
      </Button>
    </div>
  );
};

PaginationPagesInput.propTypes = {
  paginationDetail: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationPagesInput;
