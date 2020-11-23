import orderBy from "lodash/orderBy";

// Format string value into lowercase
function getValue(value) {
  if (typeof value === "string") {
    return value.toLowerCase();
  }

  return value;
}

export function sortListByType(array, sortBy, sortType) {
  return orderBy(array, [(row) => getValue(row[sortBy])], [sortType]);
}
