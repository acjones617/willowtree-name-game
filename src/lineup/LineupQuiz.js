import React from 'react';
import Lineup from './Lineup.js';
import Question from './Question.js';
import FilterOptions from './quizmodes/FilterOptions.js'
import Toggles from './quizmodes/Toggles.js'
import getRandomSelection from '../utils/randomSelection.js';
import styles from './Lineup.css';
import { NUM_CHOICES, DELAY_AFTER_CORRECT, FilterModes, ToggleModes } from '../utils/constants.js';
import { Button, Jumbotron, Modal } from 'react-bootstrap';

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
      showModal: false,
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

  handleModalClose() {
    this.setState({ showModal: false });
  }

  handleModalShow() {
    this.setState({ showModal: true });
  }

  render() {
    if (this.state.lineupEmployees.length) {
      return (
        <div>
         {this.renderOptions()}
          <Jumbotron className={styles.jumbo}>
          
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
          </Jumbotron>
        </div>
      );
    }
    return null;
  }

  renderOptions() {
    return (
      <React.Fragment>
      <Button bsStyle="primary" onClick={this.handleModalShow.bind(this)}>
        Select other game options
      </Button>
      <Modal show={this.state.showModal} onHide={this.handleModalClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Other Game Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilterOptions
            currentMode={this.state.mode}
            onClick={newMode => this.handleModeChange(newMode)}
          />
          <Toggles
            options={this.state.toggles}
            onChange={toggleName => this.handleToggle(toggleName)}
          />
        </Modal.Body>
      </Modal>
      </React.Fragment>
    );
  }
}

export default LineupQuiz;
