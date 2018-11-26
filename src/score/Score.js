import React from 'react';
import formatTime from '../utils/formatTime.js';
import styles from './Score.css';
import { Badge } from 'react-bootstrap';

const Score = function(props) {
  return (
    <div className={styles.currentGameContainer}>
      <h3>High Score: {props.highScore}</h3>
      <div>
        <span className={styles.currentGame + ' ' + styles.points}>
          Total points: {props.totalScore}
        </span>
        <span className={styles.currentGame + ' ' + styles.points}>
          Points up for grab: {props.currentRound}
        </span>
      </div>
      <div>
        <span className={styles.currentGame}>Correct- 
          <Badge className={styles.correct}>{props.correctGuesses}</Badge>
        </span>
        <span className={styles.currentGame}>Incorrect- 
          <Badge className={styles.incorrect}>{props.incorrectGuesses}</Badge>
        </span>
        <span className={styles.currentGame}>Average Time- 
          <Badge>{formatTime(props.averageTime)}</Badge>
        </span>
      </div>
    </div>);
}

export default Score;
