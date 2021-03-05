import React from 'react';
import { IDataThrow, ITurnPlayer } from '../../types';

interface IProps {
  isGameStarted: boolean;
  onStartGameClick: () => void;
  onEndGameClick: () => void;
  onRollTheDiceClick: () => void;
  isEndTurn: boolean;
  onEndTurnClick: () => void;
  turnPlayer: ITurnPlayer | null;
  dataThrow: IDataThrow | null;
}

const ControlPanel = (props: IProps) => {
  const {isGameStarted, onStartGameClick, onEndGameClick, onRollTheDiceClick, isEndTurn, onEndTurnClick, turnPlayer, dataThrow} = props;

  return (
    <div style={{gridArea: 'sidebar'}}>
      {
        !isGameStarted ?
          <button
            onClick={onStartGameClick}
          >
            start game
          </button>
          :
          <div>
            <button onClick={onEndGameClick}>end game</button>
            <button
              onClick={onRollTheDiceClick}
              disabled={!isEndTurn}
              >
              roll the dice
            </button>
            <button
              onClick={onEndTurnClick}
              disabled={isEndTurn}
              >
              end turn
            </button>
            <h2>Turn player: {turnPlayer}</h2>
            {dataThrow && <p>F: {dataThrow.f} S: {dataThrow.s}</p>}
          </div>
      }
    </div>
  )
}

export default ControlPanel;
