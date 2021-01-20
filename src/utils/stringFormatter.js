export function getFormattedNumber(number) {
  // transform number to more readable text
  // ie 100000 -> 100,000
  return number ? new Intl.NumberFormat().format(number) : number;
}

export const getFormattedValueWithUnit = (object) => {
  if (object?.value || object?.value === 0) {
    return `${getFormattedNumber(object.value)} ${object.unit}`;
  }

  return "-";
};
