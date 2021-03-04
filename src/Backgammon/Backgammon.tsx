import React, {useState} from 'react';
import Board from './components/Board/Board';
import ControlPanel from './components/ControlPanel/ControlPanel';

import {getDataThrow} from './utils/getDataThrow';

import { IDataThrow, ITurnPlayer } from './types';
import './styles.css';


const Backgammon = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [dataThrow, setDataThrow] = useState<IDataThrow | null>(null);
  const [turnPlayer, setTurnPlayer] = useState<ITurnPlayer | null>(null);
  const [isEndTurn, setIsEndTurn] = useState(true);

  const handleStartGame = () => {
    setGameStarted(true);
    setTurnPlayer(1); // сменить на рандом, у кого больше выпадет число
  }

  const handleEndGame = () => {
    setGameStarted(false);
    setDataThrow(null);
    setTurnPlayer(null);
    setIsEndTurn(true);
  }

  const changePlayer = () => {
    const player = (turnPlayer === 1) ? 2 : 1;
    setTurnPlayer(player);
  }

  const handleRollTheDice = () => {
    setDataThrow(getDataThrow());
    setIsEndTurn(false);
  }

  const handleEndTurn = () => {
    setIsEndTurn(true);
    changePlayer();
  }

  return (
    <div className='backgammon'>
      <h1 style={{gridArea: 'header'}}>Backgammon</h1>
      <Board
        dataThrow={dataThrow}
        isGameStarted={isGameStarted}
        turnPlayer={turnPlayer}
        />
      <ControlPanel
        onStartGameClick={handleStartGame}
        onEndGameClick={handleEndGame}
        onRollTheDiceClick={handleRollTheDice}
        onEndTurnClick={handleEndTurn}
        {...{isGameStarted, isEndTurn, turnPlayer, dataThrow}}
      />
    </div>
  )
}

export default Backgammon;
