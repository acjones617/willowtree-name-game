import React from 'react';
import styles from './App.css';
import LineupQuiz from './lineup/LineupQuiz';
import Score from './score/Score';
import scoreConstants from './score/scoreConstants';
import Stopwatch from './stopwatch/Stopwatch';
import { Alert, Button } from 'react-bootstrap';

/**
 * Top-level component. Makes call to API. Coordinates between quiz and scoring.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    const score = { ...scoreConstants.INITIAL_SCORE_STATE };
    score.highScore = 0;
    this.state = {
      employees: [],
      score: score,
      startTime: new Date().getTime(),
      isFrozen: false,
      error: false,
    }
  }

  componentDidMount() {
    fetch('https://willowtreeapps.com/api/v1.0/profiles/')
      .then(response => response.json())
      .then(response => this.initializeState(response))
      .catch(() => this.setState({ error: true }));
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  /**
   * Filters and stores the array of employees returned from the API.
   * @param {Array} employees - The parsed list of employees.
   */
  initializeState(employees) {
    this.setState({
      employees: employees.filter(employee => {
        return employee.slug !== 'staff' &&
          // has picture
          employee.headshot.url &&
          // WillowTree default article featured image
          employee.headshot.id !== '5ZUiD3uOByWWuaSQsayAQ6';
      }),
    });
  }

  /**
   * Triggers the display of the scoreboard and the updating of the score.
   */
  startKeepingScore() {
    this.keepScore = true;
    this.setState({ startTime: new Date().getTime() });
    this.timeInterval = setInterval(this.decreaseCurrentRound.bind(this),
      scoreConstants.DECREASE_SCORE_TIME_MS);
  }

  /**
   * Updates the score and the frozen state of the game given that a guess was made.
   * @param {boolean} isCorrect - true if the guess was correct.
   */
  handleGuess(isCorrect) {
    if (!this.keepScore) {
      this.setState({ isFrozen: isCorrect });
      return;
    }
    const score = { ...this.state.score };
    if (isCorrect) {
      const timeToGuess = new Date().getTime() - this.state.startTime;
      let totalTime = score.averageTime * score.correctGuesses + timeToGuess;
      score.correctGuesses++;
      score.averageTime = totalTime / score.correctGuesses;
      score.totalScore += score.currentRound;
      score.highScore = Math.max(score.highScore, score.totalScore);
    } else {
      score.incorrectGuesses++;
      score.totalScore -= scoreConstants.DECREASE_SCORE_WRONG;
    }

    this.setState({
      score: score,
      isFrozen: isCorrect,
    });
  }

  /**
   * Function that decreases the points available in the current round.
   * No-op if no round is currently running.
   */
  decreaseCurrentRound() {
    if (!this.state.isFrozen) {
      const score = { ...this.state.score };
      score.currentRound = Math.max(scoreConstants.MIN_POINTS_CORRECT,
        score.currentRound - scoreConstants.DECREASE_SCORE_TIME);
      this.setState({ score });
    }
  }

  /**
   * Updates the score and the frozen state of the game given that a new lineup
   * was generated.
   */
  handleNewLineup() {
    const score = { ...this.state.score };
    score.currentRound = scoreConstants.POINTS_START;
    const isFrozen = false;
    this.setState({
      isFrozen: isFrozen,
      score: score,
      startTime: new Date().getTime(),
    });
  }

  /**
   * Updates the score to zero but keeps the high score.
   */
  handleRefresh() {
    this.setState({
      score: Object.assign(this.state.score, scoreConstants.INITIAL_SCORE_STATE),
    });
  }

  render() {
    if (this.state.error) {
      return <Alert>Sorry, technical difficulties. Try again later.</Alert>;
    }
    return (
      <div className={styles.app}>
        <h1 className={styles.appHeader}>WillowTree Name Game</h1>
        {this.renderScore()}
        {this.renderQuiz()}
      </div>
    );
  }

  renderScore() {
    if (this.keepScore) {
      return (
        <React.Fragment>
          <Score {...this.state.score} />
          <Stopwatch start={this.state.startTime} />
        </React.Fragment>
      );
    } else {
      return (
        <Button
          title="Score"
          bsStyle="info"
          onClick={this.startKeepingScore.bind(this)}>
            Keep Score?
        </Button>
      );
    }
  }

  renderQuiz() {
    if (this.state.employees.length) {
      return (<LineupQuiz
                employees={this.state.employees}
                isFrozen={this.state.isFrozen}
                onGuess={isCorrect => this.handleGuess(isCorrect)}
                onNewLineup={this.handleNewLineup.bind(this)}
                onRefresh={this.handleRefresh.bind(this)}
              />);
    }
    return null;
  }

};

export default App;
