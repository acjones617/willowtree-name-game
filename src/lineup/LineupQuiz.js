import React from 'react';
import Lineup from './Lineup.js';
import Question from './Question.js';
import FilterOptions from './quizmodes/FilterOptions.js'
import Toggles from './quizmodes/Toggles.js'
import getRandomSelection from '../utils/randomSelection.js';
import { NUM_CHOICES, DELAY_AFTER_CORRECT, FilterModes, ToggleModes } from '../utils/constants.js';

class LineupQuiz extends React.Component {
  constructor(props) {
    super(props);
    const toggles = {};
    Object.keys(ToggleModes).forEach(key => toggles[key] = false);
    this.state = {
      lineupEmployees: [],
      employeeToGuess: null,
      frozen: false,
      mode: FilterModes.Default,
      toggles: toggles,
    };
    this.lineupCount = 0;
  }

  componentDidMount() {
    this.getNewLineup();
  }

  getNewLineup() {
    this.lineupCount++;
    const lineupEmployees = getRandomSelection(
      this.props.employees.filter(this.state.mode.filterFunc), NUM_CHOICES);
    this.setState({
      lineupEmployees: lineupEmployees,
      employeeToGuess: getRandomSelection(lineupEmployees, 1),
      frozen: false,
    });
    this.props.onNewLineup();
  }

  handleGuess(isCorrect) {
    this.setState({ frozen: isCorrect });
    if (isCorrect) {
      setTimeout(this.getNewLineup.bind(this), DELAY_AFTER_CORRECT);
    }
    this.props.onGuess(isCorrect);
  }

  handleModeChange(newMode) {
    if (this.state.mode !== newMode) {
      this.setState({ mode: newMode }, this.getNewLineup.bind(this));
    }
    this.props.onModeChange();
  }

  handleToggle(toggleName) {
    const toggles = { ...this.state.toggles };
    toggles[toggleName] = !toggles[toggleName];
    this.setState({ toggles })
    this.getNewLineup();
    this.props.onModeChange();
  }

  render() {
    if (this.state.lineupEmployees.length) {
      return (
        <div>
          <FilterOptions
            currentMode={this.state.mode}
            onClick={newMode => this.handleModeChange(newMode)}
          />
          <Toggles options={this.state.toggles}
                   onChange={toggleName => this.handleToggle(toggleName)} />
          <Question
            employee={this.state.employeeToGuess}
            showFace={this.state.toggles[ToggleModes.Reverse.value]}/>
          <Lineup
            key={this.lineupCount}
            employees={this.state.lineupEmployees}
            employeeToGuess={this.state.employeeToGuess}
            frozen={this.state.frozen}
            onGuess={(isCorrect) => this.handleGuess(isCorrect)}
            mode={this.state.mode}
            toggles={this.state.toggles}
          />
        </div>
      );
    }
    return null;
  }
}

export default LineupQuiz;
