import {IOccupy, ITurnPlayer} from '../../../types';

export const checkOccupiedField = (occupy: IOccupy, player: ITurnPlayer) => {
  if (!occupy) return true;
  return occupy === player;
}