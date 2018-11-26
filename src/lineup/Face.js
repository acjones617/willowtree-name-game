import React from 'react';
import styles from './Lineup.css';
import { KeyCodes } from '../utils/constants';

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

  handleKeydown(e) {
    if (this.props.isActive && e.keyCode === KeyCodes.ENTER) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <div
        className={this.getFaceClassName()}
        tabIndex='0'
        ref={this.faceRef}
        onClick={this.props.onClick}
        onKeyDown={(e) => this.handleKeydown(e)}>
          {this.maybeRenderImg()}
          {this.maybeRenderName()}
      </div>
    );
  }

  maybeRenderImg() {
    if (this.props.isSelected || this.props.faceFirst) {
      return (
        <img
        src={this.props.employee.headshot.url}
        alt={this.props.employee.headshot.alt}/>
      );
    }
    return null;
  }

  maybeRenderName() {
    if (this.props.isSelected || !this.props.faceFirst) {
      let classes = styles.textName;
      if (this.props.isSelected) {
        classes += ` ${this.props.isCorrect ? styles.correct : styles.incorrect}`;
      }
      return (
        <h4 className={classes}>
          {this.props.employee.firstName} {this.props.employee.lastName}
        </h4>
      );
    }
    return null;
  }

  getFaceClassName() {
    let classes = styles.faceContainer;
    if (this.props.isSelected) {
      classes += ` ${this.props.isCorrect ? styles.correct : styles.incorrect}`;
    }
    if (this.props.isActive) {
      classes += ` ${styles.active}`;
    }
    return classes;
  }
}

export default Face;
