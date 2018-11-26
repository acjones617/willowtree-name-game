import React from 'react';
import formatTime from '../utils/formatTime';
import styles from './Score.css';
import { Label } from 'react-bootstrap';

/** Displays the score */
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
          <Label bsStyle="success">{props.correctGuesses}</Label>
        </span>
        <span className={styles.currentGame}>Incorrect- 
          <Label bsStyle="danger">{props.incorrectGuesses}</Label>
        </span>
        <span className={styles.currentGame}>Average Time needed- 
          <Label>{formatTime(props.averageTime)}</Label>
        </span>
      </div>
    </div>);
}

export default Score;
