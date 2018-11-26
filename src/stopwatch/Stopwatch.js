import React from 'react';
import formatTime from '../utils/formatTime'

/** Displays the stopwatch counting up from 0 for each round. */
class Stopwatch extends React.Component {

  componentDidMount() {
    this.timeInterval = setInterval(this.forceUpdate.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  render() {
    return <h3>{formatTime(new Date().getTime() - this.props.start)}</h3>;
  }
}

export default Stopwatch;
