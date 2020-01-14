import React, { Component } from "react";
import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Tooltip,
  Legend,
  Cell
} from "recharts";

class Event extends Component {
  state = {
    expanded: false,
    events: []
  };

  getData = () => {
    const slots = [];
    const reserved = this.props.event.yes_rsvp_count;
    const freeSlots =
      this.props.event.rsvp_limit - this.props.event.yes_rsvp_count;
    slots.push({
      name: "Reserved",
      slots: reserved
    });

    slots.push({
      name: "Open",
      slots: freeSlots
    });

    return slots;
  };

  onDetailsButtonClicked = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  render() {
    const event = this.props.event;
    return (
      <div className="Event">
        <p className="time">
          {event.local_time} - {event.local_date}
        </p>
        <p className="name">{event.name}</p>
        {event.group && event.group.name && (
          <p className="group-name">Group: {event.group.name}</p>
        )}
        <p className="going">
          {event.yes_rsvp_count} people are going
          {this.props.event.rsvp_limit && this.props.event.yes_rsvp_count && (
            <ResponsiveContainer height={150} width={300}>
              <PieChart align={"left"}>
                <Tooltip />
                <Legend verticalAlign="top" height={60} />
                <br />
                <Pie
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  data={this.getData()}
                  dataKey="slots"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={25}
                  fill="#5b96fd"
                  label
                >
                  <Cell key={`reserved slots`} fill={"#f08080"} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </p>

        {this.state.expanded && (
          <div className="extra">
            {event.venue && event.venue.name && (
              <p className="address">
                {event.venue.name +
                  ", " +
                  event.venue.address_1 +
                  ", " +
                  event.venue.city +
                  ", " +
                  event.venue.localized_country_name}
              </p>
            )}
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
            <p className="visibility">{event.visibility}</p>
            <a className="link" href={event.link}>
              Event Link
            </a>
          </div>
        )}
        <button className="details-btn" onClick={this.onDetailsButtonClicked}>
          Details
        </button>
      </div>
    );
  }
}

export default Event;
