import React, { FC, useState } from 'react';

import styles from './styles.module.css';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  player: 1 | 2;
  in: string,
}

const Piece = (props: IProps) => {
  const {player} = props;

  const color = (player === 1) ? 'white' : 'black';

  return <div className={`${styles.piece} ${styles[color]}`} {...props}/>
}

export default Piece;