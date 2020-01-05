import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    number: 24
  };

  onNumberChange = event => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <span>Display Number of Events </span>
        <input
          type="number"
          className="number-of-events"
          onChange={this.onNumberChange}
          value={this.state.number}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
