import React from 'react';
import styles from './Lineup.css';
import { KeyCodes } from '../utils/constants';

/**
 * Component managing individual faces in the lineup.
 */
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

  /**
   * Handles keyboard event from the user, equating "enter" with a click.
   * @param {Event} the event object.
   */
  handleKeydown(e) {
    if (this.props.isActive && e.keyCode === KeyCodes.ENTER) {
      this.props.onClick();
    }
  }

  /**
   * @returns {string} the transformed url, prefixed with http:
   */
  getImageUrl() {
    return `http:${this.props.employee.headshot.url}`;
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

  /**
   * Will render the image if we are not in reverse mode or if
   * the face or name has already been selected
   */
  maybeRenderImg() {
    if (this.props.isSelected || this.props.faceFirst) {
      return <img src={this.getImageUrl()} alt={this.props.employee.headshot.alt}/>;
    }
    return null;
  }

  /**
   * Will render the name if we are in reverse mode or if
   * the face or name has already been selected
   */
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
