import React, { Component } from "react";
import { getSuggestions } from "./api";
import { InfoAlert, OfflineAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: []
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({ query: value });
    if (!navigator.onLine) {
      this.setState({
        offlineText:
          "Sorry, you are offline, we are unable to locate cities right now."
      });
    } else {
      this.setState({
        offlineText: ""
      });
    }
    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });

      if (value && suggestions.length === 0) {
        this.setState({
          infoText:
            "We can not find the city you are looking for please try another city"
        });
      } else {
        this.setState({
          infoText: ""
        });
      }
    });
  };

  handleItemClicked = (value, lat, lon) => {
    this.setState({ query: value, suggestions: [] });
    this.props.updateEvents(lat, lon);
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          placeholder="Search City"
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />

        <ul className="suggestions">
          {this.state.suggestions.map(item => (
            <li
              key={item.name_string}
              onClick={() =>
                this.handleItemClicked(item.name_string, item.lat, item.lon)
              }
            >
              {item.name_string}
              {""}
            </li>
          ))}
        </ul>
        <InfoAlert className="infoAlert" text={this.state.infoText} />
        <OfflineAlert text={this.state.offlineText} />
      </div>
    );
  }
}

export default CitySearch;
