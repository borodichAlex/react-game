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

const Board = (props: IBoardProps) => {
  const {dataThrow, isGameStarted} = props;

  const [board, setBoard] = useState<IField[]>(genBoard());

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

  }

  const dragLeaveFieldHandler = (e: any) => {

  }

  const dragEnterFieldHandler = (e: any, curField: IField) => {

  }

  const dropFieldHandler = (e: any, curField: IField) => {





  }

  const dragStartPieceHandler = (e: any, field: IField, piece: IPiece) => {

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