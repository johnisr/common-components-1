export function getStartPosition(page: number, rowPerPage: number) {
  return (page - 1) * rowPerPage + 1;
}

export function getEndPosition(
  startPosition: number,
  rowPerPage: number,
  totalRowCount: number
) {
  const endPosition = startPosition + rowPerPage - 1;
  if (endPosition > totalRowCount) {
    return totalRowCount;
  } else {
    return endPosition;
  }
}

export function validatePageNumber(
  newPage: number,
  maxPageNumber: number,
  minPageNumber: number
) {
  if (newPage > maxPageNumber) {
    return maxPageNumber;
  }

  if (newPage < minPageNumber) {
    return minPageNumber;
  }

  return newPage;
}
