import React, {useState, useEffect} from 'react';
import Piece from '../Piece/Piece';

import styles from './styles.module.css';

// start left top triangle 1 - 24
const maxSizeField = 24;
const minSizeField = 1;

type IPiece = {
  readonly id: number;
  readonly idPlayer: 1 | 2;
  field: number,
};

interface IField {
  readonly id: number,
  occupy: 1 | 2 | null,
  pieces: IPiece[],
}

interface IBoardProps {
  isGameStarted: boolean,
  dataThrow: {f: number, s: number}
}

const startFieldsBoard: IField[] = [
  {
    id: 12,
    occupy: 1,
    pieces: [
      {id: 1, field: 12, idPlayer: 1},
      {id: 2, field: 12, idPlayer: 1},
      {id: 3, field: 12, idPlayer: 1},
      {id: 4, field: 12, idPlayer: 1},
      {id: 5, field: 12, idPlayer: 1},
      {id: 6, field: 12, idPlayer: 1},
      {id: 7, field: 12, idPlayer: 1},
      {id: 8, field: 12, idPlayer: 1},
      {id: 9, field: 12, idPlayer: 1},
      {id: 10, field: 12, idPlayer: 1},
      {id: 11, field: 12, idPlayer: 1},
      {id: 12, field: 12, idPlayer: 1},
      {id: 13, field: 12, idPlayer: 1},
      {id: 14, field: 12, idPlayer: 1},
      {id: 15, field: 12, idPlayer: 1},
    ]
  },
  {
    id: 13,
    occupy: 2,
    pieces: [
      {id: 1, field: 13, idPlayer: 2},
      {id: 2, field: 13, idPlayer: 2},
      {id: 3, field: 13, idPlayer: 2},
      {id: 4, field: 13, idPlayer: 2},
      {id: 5, field: 13, idPlayer: 2},
      {id: 6, field: 13, idPlayer: 2},
      {id: 7, field: 13, idPlayer: 2},
      {id: 8, field: 13, idPlayer: 2},
      {id: 9, field: 13, idPlayer: 2},
      {id: 10, field: 13, idPlayer: 2},
      {id: 11, field: 13, idPlayer: 2},
      {id: 12, field: 13, idPlayer: 2},
      {id: 13, field: 13, idPlayer: 2},
      {id: 14, field: 13, idPlayer: 2},
      {id: 15, field: 13, idPlayer: 2},
    ]
  }
];

const genBoard = (arrFields?: IField[]): IField[] => {
  const res = [];

  for (let i = minSizeField; i <= maxSizeField; i++) {
    if (arrFields) {
      const indexField = arrFields.findIndex((field) => field.id === i);

      if (indexField !== -1) {
        res.push(arrFields[indexField]);
      } else {
        const field: IField = {id: i, occupy: null, pieces: []};
        res.push(field);
      }

    } else {
      const field: IField = {id: i, occupy: null, pieces: []};
      res.push(field);
    }
  }
  return res;
}

const checkOccupiedField = (occupy: 1 | 2 | null, player: 1 | 2) => {
  if (!occupy) return true;
  return occupy === player;
}

const checkCanMovePieceOnBoard = (indexFrom: number, indexTo: number, player: 1 | 2) => {
  const isBlackSideMove = indexTo < 12 && indexTo >= minSizeField; // 11 - 1
  const isWhiteSideMove = indexTo > 13 && indexTo <= maxSizeField; // 14 - 24

  if (player === 1) {
    if (indexFrom <= 12 && (isBlackSideMove || isWhiteSideMove)) {
      return true;
    }
    if (indexFrom >= 13 && isWhiteSideMove) {
      return true;
    }
  }

  if (player === 2) {
    if (indexFrom >= 13 && (isWhiteSideMove || isBlackSideMove)) {
      return true;
    }
    if (indexFrom <= 12 && isBlackSideMove) {
      return true;
    }
  }

  return false;
}

const checkDropPieceOnFieldByDataThrow = (dataThrow: {f: number, s: number}, indexFrom: number, indexTo: number, player: 1 | 2) => {
  console.log('check');
  const { f: firstNum, s: secondNum } = dataThrow;
  const sumNum = firstNum + secondNum;

  const isMoveWhiteSideWithoutLimit = indexFrom + firstNum === indexTo || indexFrom + secondNum === indexTo;
  const isMoveBlackSideWithoutLimit = indexFrom - firstNum === indexTo || indexFrom - secondNum === indexTo;

  if (isMoveWhiteSideWithoutLimit || isMoveBlackSideWithoutLimit) {
    console.log('can move without change side player - ' + player);
    return true;
  }

  if (player === 1) {
    const isRemainderFirst = indexFrom < firstNum;
    const isRemainderSecond = indexFrom < secondNum;

    if (isRemainderFirst && (12 - (indexFrom - firstNum) === indexTo)) {
      console.log('can move 1 player with change side');
      return true;
    }
    if (isRemainderSecond && (12 - (indexFrom - secondNum) === indexTo)) {
      console.log('can move 1 player with change side');
      return true;
    }
  }

  if (player === 2) {
    const isRemainderFirst = (indexFrom + firstNum) > 24;
    const isRemainderSecond = (indexFrom + secondNum) > 24;

    if (isRemainderFirst && (12 - (indexFrom + firstNum - 24) === indexTo)) {
      console.log('can move 2 player with change side');
      return true;
    }
    if (isRemainderSecond && (12 - (indexFrom + secondNum - 24) === indexTo)) {
      console.log('can move 2 player with change side');
      return true;
    }
  }

  return false;
}

const Board = (props: IBoardProps) => {
  const {dataThrow, isGameStarted} = props;

  const [board, setBoard] = useState<IField[]>(genBoard());

  const [fromField, setFromField] = useState<null | IField>(null);
  const [dragPiece, setDragPiece] = useState<null | IPiece>(null);

  useEffect(() => {
    if (isGameStarted) {
      setBoard(genBoard(startFieldsBoard));
    } else {
      setBoard(genBoard());
    }
  }, [isGameStarted])

  useEffect(() => {
    console.log('change board');
    console.log({board});
  }, [board])

  // 1 player - white = can move 12 -> 1 and 13 -> 24
  // 2 player - black = can move 13 -> 24 and 12 -> 1

  const dragOverFieldHandler = (e: any, curField: IField) => {
    if (fromField && dragPiece) {
      if (checkCanMovePieceOnBoard(fromField.id, curField.id, dragPiece.idPlayer)) {
        if (checkOccupiedField(curField.occupy, dragPiece.idPlayer)) {
          e.preventDefault();
        }
      }
    }
  }

  const dragLeaveFieldHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  }

  const dragEnterFieldHandler = (e: any, curField: IField) => {
    if (fromField && dragPiece) {
      if (checkDropPieceOnFieldByDataThrow(dataThrow, fromField.id, curField.id, dragPiece?.idPlayer) && checkOccupiedField(curField.occupy, dragPiece?.idPlayer)) {
        e.preventDefault();
        e.target.style.boxShadow = '#61992d 0px 0px 5px';
      }
    }
  }

  const dropFieldHandler = (e: any, curField: IField) => {
    e.preventDefault();
    const popPieceFromField = (field: IField, piece: IPiece) => {
      const pieces = [...field.pieces];
      pieces.pop();

      let occupy: 1 | 2 | null = piece.idPlayer;

      if (!pieces.length) {
        occupy = null;
      }

      return {occupy, pieces};
    }

    const insertPieceInField = (field: IField, piece: IPiece) => {
      const newPiece = {...piece, field: field.id};
      const pieces = [...field.pieces];

      pieces.push(newPiece);
      console.log({pieces});

      return {occupy: newPiece.idPlayer, pieces: pieces};
    }

    if (dragPiece && fromField) {
      setBoard(() => board.map((field) => {
        if (fromField.id === field.id) {
          const newFromField = {...fromField, ...popPieceFromField(fromField, dragPiece)};
          return newFromField;
        }
        if (curField.id === field.id) {
          const newField = {...field, ...insertPieceInField(curField, dragPiece)}
          return newField;
        }
        return field;
      }));
    }

    e.target.style.boxShadow = 'none';
  }

  const dragStartPieceHandler = (e: any, field: IField, piece: IPiece) => {
    const lenPiecesField = field.pieces.length;

    const indexLastPieceInField = lenPiecesField - 1;

    const isDragLastPiece = field.pieces[indexLastPieceInField].id === piece.id;

    const isCanDragPiece = isDragLastPiece;
    if (!isCanDragPiece) {
      e.preventDefault();
      e.stopPropagation();
    }

    setDragPiece(piece);
    setFromField(field);

    e.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div className={`${styles.board}`} >
      {
         board.map((field) => {
          const directionField = (field.id > 12) ? 'column-reverse' : 'column';
          return <div
            key={field.id}
            className={styles.field}
            id={`${field.id}`}
            style={{flexDirection: directionField}}

            onDragOver={(e) => dragOverFieldHandler(e, field)}
            onDragLeave={(e) => dragLeaveFieldHandler(e)}
            onDragEnter={(e) => dragEnterFieldHandler(e, field)}
            onDrop={(e) => dropFieldHandler(e, field)}
          >
            {
              field.pieces.map((piece) => {
                return <Piece
                  player={piece.idPlayer}
                  key={`${piece.id}-${piece.idPlayer}`}
                  in={`${piece.id}-${piece.idPlayer}`}

                  onDragStart={(e) => dragStartPieceHandler(e, field, piece)}
                  draggable
                />
              })
            }
          </div>
        })
      }
    </div>
  )

}

export default Board;