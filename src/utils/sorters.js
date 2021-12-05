import orderBy from "lodash/orderBy";
import get from "lodash/get";

const lodash = { orderBy };

// Format string value into lowercase
function getValue(value) {
  if (typeof value === "string") {
    return value.toLowerCase();
  }

  return value;
}

export function SortListByType(array, sortBy, sortType) {
  return lodash.orderBy(
    array,
    [(row) => getValue(get(row, sortBy))],
    [sortType]
  );
}
