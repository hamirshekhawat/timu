import React from "react";
import "./timer.css";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: this.props.startTime,
      timeRemaining: this.props.timeRemaining,
      countingDown: this.props.countingDown,
    };
  }

  runTimer = () => {
    setInterval(() => {
      if (this.state.timeRemaining > 0 && this.state.countingDown) {
        // maybe clear interval instead of using this condition
        this.setState({ ...this.state, timeRemaining: this.state.timeRemaining - 1 });
      }
    }, 1000);
  };

  pausePlayTimer = () => {
    this.setState({ ...this.state, countingDown: !this.state.countingDown });
  };

  resetTimer = () => {
    this.setState({ ...this.state, timeRemaining: this.props.startTime, countingDown: false });
  };

  deleteTimer = () => {
    this.props.onDeleteClick(this.props.id);
  };

  addOneMinute = () => {
    this.setState({ ...this.setState, timeRemaining: this.state.timeRemaining + 60 });
  };

  componentDidMount() {
    this.runTimer();
  }

  //   elapsedString = timeElapsedString(this.props.elapsed, this.props.runningSince);
  render() {
    const timeRemainingString = getTimeRemainingString(this.state.timeRemaining);

    return (
      <div className="timer">
        <div className="timer-string">{timeRemainingString}</div>
        <button onClick={this.pausePlayTimer}>P</button>
        <button onClick={this.resetTimer}>R</button>
        <button onClick={this.deleteTimer}>D</button>
        <button onClick={this.addOneMinute}>+1:00</button>
      </div>
    );
  }
}

function getTimeRemainingString(timeInSeconds) {
  const seconds = Math.floor(timeInSeconds % 60);
  const minutes = Math.floor((timeInSeconds / 60) % 60);
  const hours = Math.floor(timeInSeconds / 60 / 60);

  const timeString = [zeroFormat(hours.toString(), 2), zeroFormat(minutes.toString(), 2), zeroFormat(seconds.toString(), 2)].join(":");

  return timeString;
}

function zeroFormat(numberString, size) {
  let formattedString = numberString;
  while (formattedString.length < size) formattedString = `0${formattedString}`;
  return formattedString;
}
