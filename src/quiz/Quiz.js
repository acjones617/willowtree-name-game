import React from 'react';
import Lineup from '../lineup/Lineup.js';
import getRandomSelection from '../utils/randomSelection.js';
import { NUM_CHOICES, DELAY_AFTER_CORRECT } from '../utils/constants.js';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eligibleEmployees: props.employees,
      lineupEmployees: [],
      employeeToGuess: null,
      frozen: false,
    };
    this.lineupCount = 0;
  }

  componentDidMount() {
    this.getNewLineUp();
  }

  // TODO consider adding isCorrect direclty to employee object?
  getNewLineUp() {
    this.lineupCount++;
    const lineupEmployees = getRandomSelection(this.state.eligibleEmployees, NUM_CHOICES);
    this.setState(Object.assign(this.state, {
      lineupEmployees: lineupEmployees,
      employeeToGuess: getRandomSelection(lineupEmployees, 1),
      frozen: false,
    }));
  }

  handleGuess(isCorrect) {
    this.setState(Object.assign(this.state, {
      frozen: isCorrect,
    }));
    if (isCorrect) {
      setTimeout(() => this.getNewLineUp(), DELAY_AFTER_CORRECT);
    }
    this.props.onClick(isCorrect);
  }

  render() {
    if (this.state.lineupEmployees.length) {
      return (
        <div>
          {this.renderQuestion(this.state.employeeToGuess)}
          <Lineup
            key={this.lineupCount}
            employees={this.state.lineupEmployees}
            employeeToGuess={this.state.employeeToGuess}
            frozen={this.state.frozen}
            onClick={(isCorrect) => this.handleGuess(isCorrect)}
          />
        </div>
      );
    }
    return null;
  }

  renderQuestion(employee) {
    let question = '';
    if (employee) {
      question = `Who is ${employee.firstName} ${employee.lastName}?`;
    }
    return <h1>{question}</h1>
  }
}

export default Quiz;
