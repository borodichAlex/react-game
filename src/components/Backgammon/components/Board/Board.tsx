import React, {useState, useEffect} from 'react';
import { IDataThrow, ITurnPlayer, IField, IPiece, NumbersCube } from '../../types';
import Piece from '../Piece/Piece';

import {
  dataStartFieldsBoard,
  generateBoard,
  checkOccupiedField,
  checkCanMovePieceOnBoard,
  getNumMovesPiece,
} from './utils';

import styles from './styles.module.css';

interface IBoardProps {
  isGameStarted: boolean;
  dataThrow: IDataThrow | null;
  turnPlayer: ITurnPlayer | null;
}

const Board = (props: IBoardProps) => {
  const {dataThrow, isGameStarted, turnPlayer} = props;

  const [board, setBoard] = useState<IField[]>(generateBoard(dataStartFieldsBoard));

  const [fromField, setFromField] = useState<null | IField>(null);
  const [dragPiece, setDragPiece] = useState<null | IPiece>(null);
  const [dataTurn, setDataTurn] = useState<NumbersCube[]>([]);

  useEffect(() => {
    if (dataThrow) {
      const {f, s} = dataThrow;
      // const isDouble = s === f;
      const arr =
      // (isDouble) ? [s, f, s, f] :
      [s, f];
      setDataTurn(arr);
    }
  }, [dataThrow])

  useEffect(() => {
    if (isGameStarted) {
      setBoard(generateBoard(dataStartFieldsBoard));
    } else {
      setBoard(generateBoard([]));
    }
  }, [isGameStarted])

  // 1 player - white = can move 12 -> 1 and 13 -> 24
  // 2 player - black = can move 13 -> 24 and 12 -> 1

  const dragOverFieldHandler = (e: any, curField: IField) => {
    if (fromField && dragPiece) {
      const isCanMovePieceOnBoard = checkCanMovePieceOnBoard(dataTurn, fromField.id, curField.id, dragPiece.idPlayer);
      const isOccupiedField = checkOccupiedField(curField.occupy, dragPiece.idPlayer);

      if (isCanMovePieceOnBoard && isOccupiedField) {
        e.preventDefault();
        e.target.style.boxShadow = '#61992d 0px 0px 5px';
      }

    }
  }

  const dragLeaveFieldHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  }

  const dragEnterFieldHandler = (e: any, curField: IField) => {
    if (fromField && dragPiece) {
      if (checkOccupiedField(curField.occupy, dragPiece?.idPlayer)) {
        e.preventDefault();
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

      setDataTurn((data) => {
        const numMoves = getNumMovesPiece(fromField.id, curField.id) as NumbersCube;

        const index = data.indexOf(numMoves);

        const newData = data.splice(index, 1);
        return newData;
      });
    }

    e.target.style.boxShadow = 'none';
  }

  const dragStartPieceHandler = (e: any, field: IField, piece: IPiece) => {
    const isTurnPlayerDragPiece = piece.idPlayer === turnPlayer;
    const isHaveTurns = dataTurn.length;

    if (isTurnPlayerDragPiece && isHaveTurns) {
      const lenPiecesField = field.pieces.length;
      const indexLastPieceInField = lenPiecesField - 1;

      const isDragLastPiece = field.pieces[indexLastPieceInField].id === piece.id;

      if (isDragLastPiece) {
        e.target.style.cursor = 'grab';
        setDragPiece(piece);
        setFromField(field);

        e.dataTransfer.effectAllowed = 'move';

      } else {
        e.preventDefault();
        e.stopPropagation();
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
    }

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