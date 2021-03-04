import { ITurnPlayer, NumbersCube } from "../../../types";
import { maxSizeField, minSizeField } from "./dataBoard";

export const checkCanMovePieceOnBoard = (dataTurn: NumbersCube[], indexFrom: number, indexTo: number, player: ITurnPlayer) => {
  const [firstNum, secondNum] = dataTurn;
  const sumNum = firstNum + secondNum;

  const isMoveWhiteSideWithoutLimit = indexFrom + firstNum === indexTo || indexFrom + secondNum === indexTo;
  const isMoveBlackSideWithoutLimit = indexFrom - firstNum === indexTo || indexFrom - secondNum === indexTo;

  const isBlackSideMove = indexTo <= 12 && indexTo >= minSizeField; // 11 - 1
  const isWhiteSideMove = indexTo >= 13 && indexTo <= maxSizeField; // 14 - 24

  if (player === 1) {
    const isRemainderFirst = indexFrom < firstNum;
    const isRemainderSecond = indexFrom < secondNum;

    const isChangeSideFirst = isRemainderFirst && (13 - (indexFrom - firstNum) === indexTo);
    const isChangeSideSecond = isRemainderSecond && (13 - (indexFrom - secondNum) === indexTo);

    if (indexFrom <= 12 && indexFrom > indexTo && isBlackSideMove) { // only black side
      if (isMoveBlackSideWithoutLimit) {
        return true;
      }
    }
    if (indexFrom <= 12 && isWhiteSideMove) { // from black side to white side
      if (isChangeSideFirst || isChangeSideSecond) {
        return true;
      }
    }
    if (indexFrom >= 13 && indexFrom < indexTo && isWhiteSideMove) { // only black side
      if (isMoveWhiteSideWithoutLimit) {
        return true;
      }
    }
  }

  if (player === 2) {
    const isRemainderFirst = (indexFrom + firstNum) > 24;
    const isRemainderSecond = (indexFrom + secondNum) > 24;

    const isChangeSideFirst = isRemainderFirst && (13 - (indexFrom + firstNum - 24) === indexTo);
    const isChangeSideSecond = isRemainderSecond && (13 - (indexFrom + secondNum - 24) === indexTo);

    if (indexFrom >= 13 && indexFrom < indexTo && isWhiteSideMove) { // only white side
      if (isMoveWhiteSideWithoutLimit) {
        return true;
      }
    }

    if (indexFrom >= 13 && isBlackSideMove) { // from white side to black side
      if (isChangeSideFirst || isChangeSideSecond) {
        return true;
      }
    }

    if (indexFrom <= 12 && indexFrom > indexTo && isBlackSideMove) { // only black side
      if (isMoveBlackSideWithoutLimit) {
        return true;
      }
    }
  }

  return false;
}