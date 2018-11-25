import React from 'react';
import styles from './Lineup.css';
import { KeyCodes } from '../utils/constants.js';

// TODO: also make active if user tabs to element?
class Face extends React.Component {
  constructor(props) {
    super(props);
    this.faceRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.isActive) {
      this.faceRef.current.focus();
    }
  }

  handleGuess() {
    if (!this.props.frozen) {
      this.props.onClick();
    }
  }

  handleKeydown(e) {
    if (this.props.isActive && e.keyCode === KeyCodes.ENTER) {
      this.handleGuess();
    }
  }

  render() {
    return (
      <div className={styles.faceContainer}
           tabIndex='0'
           ref={this.faceRef}
           onClick={this.handleGuess.bind(this)}
           onKeyDown={(e) => this.handleKeydown(e)}>
            <img className={this.getImgClassName()}
              src={this.props.employee.headshot.url}
              alt={this.props.employee.headshot.alt}/>
            {this.maybeRenderName()}
      </div>
    );
  }

  maybeRenderName() {
    if (this.props.isSelected) {
      const classes = this.props.isCorrect ? styles.correct : styles.incorrect;
      return <h4 className={classes}>
      {this.props.employee.firstName} {this.props.employee.lastName}</h4>;
    }
    return null;
  }

  getImgClassName() {
    if (this.props.isSelected) {
      return this.props.isCorrect ? styles.correct : styles.incorrect;
    }
    if (this.props.isActive) {
      return styles.active;
    }
  }
}

export default Face;
