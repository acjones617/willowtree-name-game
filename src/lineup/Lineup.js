import React from 'react';
import Face from './Face';
import styles from './Lineup.css';
import getRandomSelection from '../utils/randomSelection';
import { KeyCodes, DELAY_BEFORE_HINT, ToggleModes } from '../utils/constants';

const KeyDirections = {
  'RIGHT': new Set([
    KeyCodes.RIGHT,
    KeyCodes.DOWN,
    KeyCodes.L,
    KeyCodes.J,
  ]),
  'LEFT': new Set([
    KeyCodes.LEFT,
    KeyCodes.UP,
    KeyCodes.H,
    KeyCodes.K,
  ]),
};

/**
 * Handles user navigation of the lineup with shortcuts and toggling
 * whether a face has been selected or removed from the lineup.
 */
class Lineup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmployees: Array(props.employees.length).fill(false),
      removedEmployees: Array(props.employees.length).fill(false),
      activeEmployee: null,
    };
    this.handleMove = this.handleMove.bind(this);
    if (this.props.toggles[ToggleModes.Hint.value]) {
      this.beginHintMode();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleMove);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleMove);
    clearInterval(this.hintInterval);
  }

  /**
   * If we are in hint mode, triggers the slow removal of faces from the lineup.
   */
  beginHintMode() {
    this.hintInterval = setInterval(() => {
      const indicesToHide = [];
      this.state.selectedEmployees.forEach((selected, i) => {
        if (!selected && !this.state.removedEmployees[i] &&
          this.props.employees[i] !== this.props.employeeToGuess) {
          indicesToHide.push(i);
        }
      });
      if (indicesToHide.length) {
        const index = getRandomSelection(indicesToHide, 1);
        const removedEmployees = this.state.removedEmployees.slice();
        removedEmployees[index] = true;
        this.setState({ removedEmployees })
      }
    }, DELAY_BEFORE_HINT);
  }

  /**
   * Handles a guess to a given face by setting the face as selected, if
   * it has not been selected already.
   * @param {number} index - the index of the selected face.
   * @param {boolean} isCorrect - true if guess was on the correct face.
   */
  handleGuess(index, isCorrect) {
    if (this.props.isFrozen || this.state.selectedEmployees[index]) {
      return;
    }
    const selectedEmployees = this.state.selectedEmployees.slice();
    selectedEmployees[index] = true;
    this.setState({ selectedEmployees: selectedEmployees });
    this.props.onGuess(isCorrect);
  }

  /**
   * For navigating with keyboard shortcuts, can a given index be navigated to,
   * given whether or not that index has already been selected or removed?
   * @param {number} i - the index of the selected face.
   * @returns {boolean} true if the user can navigate to the given index.
   */
  canMakeActive(i) {
    return !this.state.selectedEmployees[i] && !this.state.removedEmployees[i];
  }

  /**
   * Navigating to the "right", finds the next navigable face
   * @returns {number} the index of the next unselected face.
   */
  findNextUnselected() {
    let startIndex;
    const lineupLength = this.props.employees.length;
    if (this.state.activeEmployee === null ||
      this.state.activeEmployee === lineupLength - 1) {
      startIndex = 0;
    } else {
      startIndex = this.state.activeEmployee + 1;
    }

    let nextIndex;
    for (let i = startIndex; i <= startIndex + lineupLength; i++) {
      nextIndex = i % lineupLength;
      if (this.canMakeActive(nextIndex)) {
        return nextIndex;
      }
    }
  }

  /**
   * Navigating to the "left", find the next navigable face
   * @returns {number} the index of the next unselected face.
   */
  findPreviousUnselected() {
    const lineupLength = this.props.employees.length;
    const activeEmployee = this.state.activeEmployee;
    let startIndex;
    if (activeEmployee === null || activeEmployee === 0) {
      startIndex = lineupLength - 1;
    } else {
      startIndex = activeEmployee - 1;
    }

    let nextIndex;
    for (let i = startIndex; i >= startIndex - lineupLength; i--) {
      nextIndex = (i + lineupLength) % lineupLength;
      if (this.canMakeActive(nextIndex)) {
        return nextIndex;
      }
    }
  }

  /**
   * Handles a keyboard event from user trying to move the cursor.
   * No-op if we are in between rounds.
   * @param {Event} the event object
   */
  handleMove(e) {
    if (this.props.isFrozen) {
      return;
    }
    if (KeyDirections.RIGHT.has(e.keyCode)) {
      this.setState({ activeEmployee: this.findNextUnselected() });
    } else if (KeyDirections.LEFT.has(e.keyCode)) {
      this.setState({ activeEmployee: this.findPreviousUnselected() });
    }
  }

  render() {
    return (
      <div className={styles.lineUp}>
        {this.renderFaces()}
      </div>
    );
  }

  renderFaces() {
    return this.props.employees.map((employee, i) => {
      const isCorrect = this.props.employeeToGuess === employee;
      if (!this.state.removedEmployees[i]) {
        return (
          <Face
            key={employee.id}
            employee={employee}
            isActive={this.state.activeEmployee === i}
            isCorrect={isCorrect}
            isSelected={this.state.selectedEmployees[i]}
            faceFirst={!this.props.toggles[ToggleModes.Reverse.value]}
            onClick={() => this.handleGuess(i, isCorrect)}
        />
        );
      }
      return null;
    });
  }
}

export default Lineup;
