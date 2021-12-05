import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import "./PaginationController.scss";
import { Button } from "../..";
import FontAwesome from "react-fontawesome";
import { validatePageNumber } from "./PaginationControllerHelper";
import { MIN_PAGE_NUMBER } from "./PaginationControllerConstant";
import { PaginationPagesInputPropsType } from "../../types/Table/PaginationController";

const PaginationPagesInput = (props: PaginationPagesInputPropsType) => {
  const { page, totalRowCount, rowPerPage } = props.paginationDetail;

  const [pageInput, setPageInput] = useState<number>(page);
  const maxPageNumber = Math.ceil(totalRowCount / rowPerPage);

  useEffect(() => {
    setPageInput(page);
  }, [page]);

  const onInputChange = (newPageNumber: string) => {
    const pageNumber = validatePageNumber(
      parseInt(newPageNumber),
      maxPageNumber,
      MIN_PAGE_NUMBER
    );

    if (!isNaN(pageNumber)) {
      setPageInput(pageNumber);
    }
  };

  const onButtonClick = (newPageNumber: number) => {
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
        disabled={page === MIN_PAGE_NUMBER || props.disabled}
        onClick={() => onButtonClick(page - 1)}
      >
        <FontAwesome name="caret-left" />
      </Button>

      <input
        className="paginationPage__input"
        type="number"
        onChange={(event) => onInputChange(event.target.value)}
        onBlur={() => onInputLeave()}
        value={pageInput}
        disabled={props.disabled}
      />

      <Button
        className="paginationPage__button"
        disabled={page >= maxPageNumber || props.disabled}
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
  disabled: PropTypes.bool,
};

export default PaginationPagesInput;
