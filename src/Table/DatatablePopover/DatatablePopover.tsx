import React, { useEffect, useRef } from "react";
import * as PropTypes from "prop-types";
import "./DatatablePopover.scss";
import DatatablePopoverType from "../../types/Table/DatatablePopover";

const DatatablePopover = <T,>({
  rowData,
  availableActions,
  closePopover,
}: DatatablePopoverType<T>) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", onClickEvent);
    return () => document.removeEventListener("mousedown", onClickEvent);
  }, []);

  const onClickEvent = (event: MouseEvent) => {
    if (
      popoverRef &&
      !popoverRef.current?.contains(event.target as HTMLDivElement)
    ) {
      closePopover();
    }
  };

  return (
    <div className="datatablePopover" ref={popoverRef}>
      {availableActions?.length ? (
        availableActions.map((action) => {
          const onClick = () => {
            action.onClick(rowData);
            closePopover();
          };

          return (
            <div
              className="datatablePopover__menuitem"
              key={action.title}
              onClick={onClick}
            >
              {action.title}
            </div>
          );
        })
      ) : (
        <div className="datatablePopover__noActions">No Available Actions</div>
      )}
    </div>
  );
};

DatatablePopover.propTypes = {
  rowData: PropTypes.object.isRequired,
  availableActions: PropTypes.array.isRequired,
  closePopover: PropTypes.func.isRequired,
};

export default DatatablePopover;
