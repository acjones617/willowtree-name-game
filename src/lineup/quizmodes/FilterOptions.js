import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FilterModes } from '../../utils/constants.js';
import styles from './quizmodes.css';

class FilterOptions extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <span>Group to play from:</span>
        {Object.keys(FilterModes).map(mode => this.renderButton(FilterModes[mode]))}
      </div>
    );
  }

  renderButton(mode) {
    const currentMode = mode === this.props.currentMode;
    const tooltip = (
      <Tooltip id={mode.name}>
        {currentMode ? "Current Mode - " : ""}{mode.desc}
      </Tooltip>
    );
    return (
      <OverlayTrigger key={mode.name} placement="top" overlay={tooltip}>
        <Button
          title={mode.name}
          bsStyle={currentMode ? "success" : "default"}
          onClick={() => this.props.onClick(mode)}>
            {mode.name}
        </Button>
      </OverlayTrigger>
    );
  }
}

export default FilterOptions;
