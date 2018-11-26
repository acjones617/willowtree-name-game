import React from 'react';
import Face from './Face.js';
import styles from './Lineup.css';
import getRandomSelection from '../utils/randomSelection.js';
import { KeyCodes, DELAY_BEFORE_HINT, ToggleModes } from '../utils/constants.js';

const KeyDirections = {
  'RIGHT': new Set([
    KeyCodes.RIGHT,
    KeyCodes.DOWN,
    KeyCodes.K,
    KeyCodes.L
  ]),
  'LEFT': new Set([
    KeyCodes.LEFT,
    KeyCodes.UP,
    KeyCodes.H,
    KeyCodes.J
  ]),
};

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

  componentDidMount() {
    document.addEventListener('keydown', this.handleMove);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleMove);
    clearInterval(this.hintInterval);
  }

  handleGuess(index, isCorrect) {
    const selectedEmployees = this.state.selectedEmployees.slice();
    selectedEmployees[index] = true;
    this.setState({ selectedEmployees: selectedEmployees });
    this.props.onGuess(isCorrect);
  }

  canMakeActive(i) {
    return !this.state.selectedEmployees[i] && !this.state.removedEmployees[i];
  }

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

  handleMove(e) {
    if (this.props.frozen) {
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
            frozen={this.props.frozen}
            onClick={() => this.handleGuess(i, isCorrect)}
        />
        );
      }
      return null;
    });
  }
}

export default Lineup;
