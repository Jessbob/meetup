import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    number: 32
  };

  onNumberChange = event => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);

    if (value < 1) {
      this.setState({
        errorText: "The number of events must be greater than zero."
      });
    } else {
      this.setState({
        errorText: ""
      });
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <span>
          <ErrorAlert text={this.state.errorText} />
          <input
            type="number"
            className="number-of-events"
            onChange={this.onNumberChange}
            value={this.state.number}
          />
          Events Displayed
        </span>
      </div>
    );
  }
}

export default NumberOfEvents;
