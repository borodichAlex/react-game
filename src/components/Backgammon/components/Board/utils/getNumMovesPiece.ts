export const getNumMovesPiece = (from: number, to: number) => {
  if (to <= 12 && from >= 13) {
    return 24 - from + 13 - to;
  } else if (from <= 12 && to >= 13) {
    return from + to - 13;
  } else if (to > from) {
    return to - from;
  } else if (from > to) {
    return from - to;
  } else {
    return 0;
  }
}