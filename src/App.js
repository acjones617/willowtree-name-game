import React from 'react';
import styles from './App.css';
import LineupQuiz from './lineup/LineupQuiz.js';
import Score from './score/Score.js';
import Stopwatch from './stopwatch/Stopwatch.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialScoreState = {
      totalScore: 0,
      currentRound: 1000,
      correctGuesses: 0,
      incorrectGuesses: 0,
      averageTime: 0,
    };
    const score = { ...this.initialScoreState };
    score.highScore = 0;
    this.state = {
      employees: [],
      score: score,
      startTime: new Date().getTime(),
    }
    this.filteredEmployeesByMode = {};
  }

  componentDidMount() {
    fetch('https://willowtreeapps.com/api/v1.0/profiles/')
      .then(response => response.json())
      .then(response => this.initializeState(response))
      .catch(error => console.log(error)); // TODO: handle error

    this.timeInterval = setInterval(() => this.decreaseCurrentRound(), 200);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

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

  handleGuess(isCorrect) {
    const score = { ...this.state.score };
    if (isCorrect) {
      const timeToGuess = new Date().getTime() - this.state.startTime;
      let totalTime = score.averageTime * score.correctGuesses + timeToGuess;
      score.correctGuesses++;
      score.averageTime = totalTime / score.correctGuesses;
      score.totalScore += score.currentRound;
      score.highScore = Math.max(score.highScore, score.totalScore);
      this.frozen = true;
    } else {
      score.incorrectGuesses++;
      score.totalScore -= 200;
    }

    this.setState({ score });
  }

  decreaseCurrentRound() {
    if (!this.frozen) {
      const score = { ...this.state.score };
      score.currentRound = Math.max(100, score.currentRound - 5);
      this.setState({ score });
    }
  }

  handleNewLineup() {
    const score = { ...this.state.score };
    score.currentRound = 1000;
    this.frozen = false;
    this.setState({ 
      score: score,
      startTime: new Date().getTime(),
    });
  }

  handleModeChange(newMode) {
    this.setState({
      mode: newMode,
      score: Object.assign(this.state.score, this.initialScoreState),
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <Score {...this.state.score} />
        <Stopwatch start={this.state.startTime} />
        {this.renderQuiz()}
      </div>
    );
  }

  renderQuiz() {
    if (this.state.employees.length) {
      return (<LineupQuiz
              employees={this.state.employees}
              onGuess={isCorrect => this.handleGuess(isCorrect)}
              onNewLineup={this.handleNewLineup.bind(this)}
              onModeChange={this.handleModeChange.bind(this)}
            />);
    }
    return null;
  }

};

export default App;
