import React from 'react';
import Toggle from './Toggle';
import styles from './quizmodes.css';

/**
 * Component handling how the game is played, rendering a toggle
 * for each mode.
 */
const Toggles = function(props) {
  return (
    <div className={styles.container}>
      <span>Other possibilities:</span>
      {Object.keys(props.options).map(option => {
        return <Toggle
              key={option}
              name={option}
              checked={props.options[option]}
              onChange={props.onChange}
            />
      })}
    </div>
  );
};

export default Toggles;
