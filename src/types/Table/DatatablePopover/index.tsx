import { actionDropdownType } from "../Datatable";

type DatatablePopoverType<T> = {
  rowData: T;
  availableActions: actionDropdownType<T>[];
  closePopover: () => void;
};

export default DatatablePopoverType;
