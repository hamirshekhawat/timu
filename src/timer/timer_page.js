import React from "react";
import "./timer.css";
import { Timer } from "./timer_card";
import { TimerForm } from "./timer_form";

/**
 * Timer state
state = {
    startTime: 1000,
    timeRemaining: 1000,
    countingDown: true, // for pausing and starting 
};
 */

let ID = 0

export class TimersPage extends React.Component {
  state = {
    timers: [],
  };

  onAddTimerClick = (totalSeconds) => {
    
    var id = ID++;
    var timer = {
      id: id,
      startTime: totalSeconds,
      timeRemaining: totalSeconds,
      countingDown: true,
    };
    this.createTimer(timer);
  };

  onDeleteClick = (id) => {
    this.deleteTimer(id);
  };

  createTimer = (timer) => {
    this.setState({
      timers: this.state.timers.concat(timer),
    });
  };

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter((t) => t.id !== timerId),
    });
  };

  render() {
    return (
      <div>
        <TimerList timers={this.state.timers} onDeleteClick={this.onDeleteClick} />
        <AddTimerForm onFormSubmit={this.onAddTimerClick} />
      </div>
    );
  }
}

class TimerList extends React.Component {
  render() {
    const timers = this.props.timers.map((timer) => (
      <Timer
        key={timer.id}
        id={timer.id}
        startTime={timer.startTime}
        timeRemaining={timer.timeRemaining}
        countingDown={timer.countingDown}
        onDeleteClick={this.props.onDeleteClick}
      />
    ));
    return <div id="timers">{timers}</div>;
  }
}

class AddTimerForm extends React.Component {
  // constructor not used to create state. Learn what should be the correct pattern here.
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    // when we do this we dont need to bind. Understand what bind is doing.
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (timer) => {
    let totalSeconds = timer.h * 60 + timer.m * 60 + timer.s;
    this.props.onFormSubmit(totalSeconds);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return <TimerForm onFormSubmit={this.handleFormSubmit} onFormClose={this.handleFormClose} />;
    } else {
      return (
        <div className="">
          <button className="" onClick={this.handleFormOpen}>
            +
          </button>
        </div>
      );
    }
  }
}
