export function getStartPosition(page, rowPerPage) {
  return (page - 1) * rowPerPage + 1;
}

export function getEndPosition(startPosition, rowPerPage, totalRowCount) {
  const endPosition = startPosition + rowPerPage - 1;
  if (endPosition > totalRowCount) {
    return totalRowCount;
  } else {
    return endPosition;
  }
}

export function validatePageNumber(newPage, maxPageNumber, minPageNumber) {
  if (newPage > maxPageNumber) {
    return maxPageNumber;
  }

  if (newPage < minPageNumber) {
    return minPageNumber;
  }

  return parseInt(newPage);
}
