import React, {useState} from 'react';
import Board from './components/Board/Board';

import './styles.css';

const getDataThrow = () => {
  const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

  return {
    f: getRandomInt(6, 1),
    s: getRandomInt(6, 1),
  }
}

const Backgammon = () => {
  const initialDataThrow = {f: 0, s: 0};
  const [isGameStarted, setGameStarted] = useState(false);
  const [dataThrow, setDataThrow] = useState(initialDataThrow);
  const [turnPlayer, setTurnPlayer] = useState<1 | 2 | null>(null);

  const startGameHandler = () => {
    console.log('start game');
    setGameStarted(true);
    setTurnPlayer(1); // сменить на рандом, у кого больше выпадет число
  }

  const endGameHandler = () => {
    console.log('end game');
    setGameStarted(false);
    setDataThrow(initialDataThrow);
    setTurnPlayer(null);
  }

  const changeTurn = () => {
    const player = (turnPlayer === 1) ? 2 : 1;
    setTurnPlayer(player);
  }

  const rollDiceHandler = () => {
    if (isGameStarted) {
      console.log('roll the dice ' + turnPlayer);
      setDataThrow(getDataThrow());
      changeTurn();
    }
  }

  return (
    <div className='root'>
      <button onClick={startGameHandler} disabled={isGameStarted} hidden={isGameStarted}>start game</button>
      <button onClick={endGameHandler} disabled={!isGameStarted} hidden={!isGameStarted}>end game</button>
      <button onClick={rollDiceHandler} disabled={!isGameStarted}>roll the dice</button>
      <p>f:{dataThrow.f}s:{dataThrow.s}</p>
    </div>
  )
}

export default Backgammon;
