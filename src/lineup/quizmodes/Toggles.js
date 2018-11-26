import React from 'react';
import Toggle from './Toggle.js';
import styles from './quizmodes.css';

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
