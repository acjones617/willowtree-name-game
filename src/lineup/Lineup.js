import React from 'react';
import Face from './Face.js';
import styles from './Lineup.css';
import { KeyCodes } from '../utils/constants.js';

const KeyDirections = {
  'RIGHT': new Set([KeyCodes.RIGHT, KeyCodes.DOWN]),
  'LEFT': new Set([KeyCodes.LEFT, KeyCodes.UP]),
};

class Lineup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmployees: Array(props.employees.length).fill(false),
      activeEmployee: null,
    };
    this.handleMove = this.handleMove.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleMove);
  }

  componentDidUnMount() {
    document.removeEventListener('keydown', this.handleMove);
  }

  handleGuess(index, isCorrect) {
    const selectedEmployees = this.state.selectedEmployees.slice();
    selectedEmployees[index] = true;
    this.setState(Object.assign(this.state, {
      selectedEmployees: selectedEmployees,
    }));
    this.props.onClick(isCorrect);
  }

  findNextUnselected() {
    const searchFunc = isSelected => !isSelected;
    let startIndex;
    const employees = this.state.selectedEmployees;
    if (this.state.activeEmployee === null ||
      this.state.activeEmployee === employees.length - 1) {
      startIndex = 0;
    } else {
      startIndex = this.state.activeEmployee + 1;
    }
    let nextIndex = employees.slice(startIndex)
      .findIndex(searchFunc) + startIndex;
    // if no active employee was found in those to the right:
    if (nextIndex === -1) {
      nextIndex = employees.findIndex(searchFunc);
    }
    return nextIndex;
  }

  findPreviousUnselected() {
    const employees = this.state.selectedEmployees;
    const activeEmployee = this.state.activeEmployee;
    let startIndex;
    if (activeEmployee === null || activeEmployee === 0) {
      startIndex = employees.length - 1;
    } else {
      startIndex = activeEmployee - 1;
    }

    let nextIndex;
    for (let i = startIndex; i >= startIndex - employees.length; i--) {
      nextIndex = (i + employees.length) % employees.length;
      if (!employees[nextIndex]) {
        return nextIndex;
      }
    }
  }

  handleMove(e) {
    if (this.props.frozen) {
      return;
    }
    if (KeyDirections.RIGHT.has(e.keyCode)) {
      this.setState(Object.assign(this.state, {
        activeEmployee: this.findNextUnselected()
      }));
    } else if (KeyDirections.LEFT.has(e.keyCode)) {
      this.setState(Object.assign(this.state, {
        activeEmployee: this.findPreviousUnselected()
      }));
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
      return (
        <Face
          key={employee.id}
          employee={employee}
          isActive={this.state.activeEmployee === i}
          isCorrect={isCorrect}
          isSelected={this.state.selectedEmployees[i]}
          frozen={this.props.frozen}
          onClick={() => this.handleGuess(i, isCorrect)}
        />
      );
    });
  }
}

export default Lineup;
