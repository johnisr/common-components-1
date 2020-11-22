// With a font-size of 13px, the average character width is 8px for Roboto font
const CHARACTER_WIDTH_IN_PIXELS = 8;

/**
 * Useful for describing the width of a group of columns with variable header
 * label width but roughly the same width in cell values (e.g. Mole Percentage
 * measurement columns)
 */
export function getColumnWidth(label, minColumnWidth) {
  const labelLength = label?.length ?? 0;

  return Math.max(minColumnWidth, labelLength * CHARACTER_WIDTH_IN_PIXELS);
}

export function InputIsMatched(searchValue, itemValue) {
  if (searchValue && searchValue !== "") {
    const lowerCaseValue = String(itemValue).toLowerCase();
    const lowerCaseSearch = String(searchValue).toLowerCase();

    return lowerCaseValue.includes(lowerCaseSearch);
  } else {
    return true;
  }
}

export function SortListByType(array, sortBy, sortType) {
  return lodash.orderBy(array, [(row) => getValue(row[sortBy])], [sortType]);
}