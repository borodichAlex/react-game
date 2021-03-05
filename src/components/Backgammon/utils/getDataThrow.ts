import { IDataThrow, NumbersCube } from '../types';

export const getDataThrow = (): IDataThrow => {
  const getRandomInt = (min: 1 = 1, max: 6 = 6) => Math.floor(Math.random() * (max - min)) + min;

  const f = getRandomInt(1, 6) as NumbersCube;
  const s = getRandomInt(1, 6) as NumbersCube;

  return {f, s}
}