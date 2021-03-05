type NumbersCube = 1 | 2 | 3 | 4 | 5 | 6;

interface IDataThrow {
  f: NumbersCube;
  s: NumbersCube;
}

type ITurnPlayer = 1 | 2;

type IPiece = {
  readonly id: number;
  readonly idPlayer: 1 | 2;
  field: number;
};

type IOccupy = 1 | 2 | null;

interface IField {
  readonly id: number;
  occupy: IOccupy;
  pieces: IPiece[];
}

export type {
  NumbersCube,
  IDataThrow,
  ITurnPlayer,
  IPiece,
  IField,
  IOccupy
};