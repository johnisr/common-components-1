export function InputIsMatched(searchValue, itemValue) {
  if (searchValue && searchValue !== "") {
    const lowerCaseValue = String(itemValue).toLowerCase();
    const lowerCaseSearch = String(searchValue).toLowerCase();

    return lowerCaseValue.includes(lowerCaseSearch);
  } else {
    return true;
  }
}
