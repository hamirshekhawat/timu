import React from "react";
import "./timer.css";

export class TimerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      h: 0,
      m: 0,
      s: 0,
    };

    this.updateHours = this.updateHours.bind(this);
    this.updateMinutes = this.updateMinutes.bind(this);
    this.updateSeconds = this.updateSeconds.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateHours(v) {
    this.setState({ h: v.target.value });
  }

  updateMinutes(v) {
    this.setState({ m: v.target.value });
  }

  updateSeconds(v) {
    this.setState({ s: v.target.value });
  }

  handleSubmit() {
    this.props.onFormSubmit({
      h: this.state.h,
      m: this.state.m,
      s: this.state.s,
    });
  }

  render() {
    return (
      <div>
        <div>
          Hours <input type="number" value={this.state.h} onChange={this.updateHours} />
        </div>
        <div>
          Minutes <input type="number" value={this.state.m} onChange={this.updateMinutes} />
        </div>
        <div>
          Seconds <input type="number" value={this.state.s} onChange={this.updateSeconds} />
        </div>
        <button onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}
