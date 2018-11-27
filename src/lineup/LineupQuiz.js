import React from 'react';
import Lineup from './Lineup';
import Question from './Question';
import OptionsModal from './quizmodes/OptionsModal'
import getRandomSelection from '../utils/randomSelection';
import styles from './Lineup.css';
import { NUM_CHOICES, DELAY_AFTER_CORRECT, FilterModes, ToggleModes } from '../utils/constants';
import { Jumbotron } from 'react-bootstrap';

/**
 * Handles generating new lineups when needed and updating the game mode.
 */
class LineupQuiz extends React.Component {
  constructor(props) {
    super(props);
    const toggles = {};
    Object.keys(ToggleModes).forEach(key => toggles[key] = false);
    this.state = {
      lineupEmployees: [],
      employeeToGuess: null,
      mode: FilterModes.Default,
      toggles: toggles,
    };
    this.lineupCount = 0;
  }

  componentDidMount() {
    this.getNewLineup();
  }

  /**
   * Generates a new lineup of 5 employees based on the current mode and a single
   * employee who is being guessed.
   */
  getNewLineup() {
    this.lineupCount++;
    const lineupEmployees = getRandomSelection(
      this.props.employees.filter(this.state.mode.filterFunc), NUM_CHOICES);
    this.setState({
      lineupEmployees: lineupEmployees,
      employeeToGuess: getRandomSelection(lineupEmployees, 1),
    });
    this.props.onNewLineup();
  }

  /**
   * Handles a guess being made. If correct, the game will pause for a second before
   * generating the new lineup.
   */
  handleGuess(isCorrect) {
    if (isCorrect) {
      setTimeout(this.getNewLineup.bind(this), DELAY_AFTER_CORRECT);
    }
    this.props.onGuess(isCorrect);
  }

  /**
   * Handles a new game mode being selected by generating a new lineup given the new
   * mode and triggering a refresh on the parent component.
   */
  handleModeChange(newMode, newToggles) {
    this.setState({ mode: newMode, toggles: newToggles }, this.getNewLineup.bind(this));
    this.props.onRefresh();
  }

  render() {
    if (this.state.lineupEmployees.length) {
      return (
        <div>
          <OptionsModal
            onChange={(newMode, newToggles) => this.handleModeChange(newMode, newToggles)}
            mode={this.state.mode}
            toggles={this.state.toggles}
          />
          <Jumbotron className={styles.jumbo}>
            <Question
              employee={this.state.employeeToGuess}
              showFace={this.state.toggles[ToggleModes.Reverse.value]}/>
            <Lineup
              key={this.lineupCount}
              employees={this.state.lineupEmployees}
              employeeToGuess={this.state.employeeToGuess}
              isFrozen={this.props.isFrozen}
              onGuess={(isCorrect) => this.handleGuess(isCorrect)}
              mode={this.state.mode}
              toggles={this.state.toggles}
            />
          </Jumbotron>
        </div>
      );
    }
    return null;
  }
}

export default LineupQuiz;
