import React from 'react';
import styles from './App.css';
import Quiz from './quiz/Quiz.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    }
  }

  componentDidMount() {
    fetch('https://willowtreeapps.com/api/v1.0/profiles/')
      .then(response => response.json())
      .then(response => this.initializeState(response))
      .catch(error => console.log(error)); // TODO: fix
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
    // increase score
  }

  renderQuiz() {
    if (this.state.employees.length) {
      const handleGuess = isCorrect => this.handleGuess(isCorrect);
      return (<Quiz
            employees={this.state.employees}
            onClick={handleGuess}
            onKeyDown={handleGuess}
            />);
    }
    return null;
  }

  render() {
    return (
      <div className={styles.app}>{this.renderQuiz()}</div>
    );
  }
};

export default App;
