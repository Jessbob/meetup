import React, { Component } from "react";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents } from "./api";

class App extends Component {
  state = {
    events: [],
    lat: null,
    lon: null,
    page: null
  };

  componentDidMount() {
    this.updateEvents();
  }

  countEventsOnADate = date => {
    let count = 0;
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
    }
    return count;
  };

  getData = () => {
    const next7Days = [];
    const currentDate = moment();
    for (let i = 0; i < 7; i += 1) {
      currentDate.add(1, "days");
      const dateString = currentDate.format("YYYY-MM-DD");
      const count = this.countEventsOnADate(dateString);
      next7Days.push({ date: dateString, number: count });
    }
    return next7Days;
  };

  updateEvents = (lat, lon, page) => {
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(events =>
        this.setState({ events, lat, lon })
      );
    } else if (page) {
      getEvents(this.state.lat, this.state.lon, page).then(events =>
        this.setState({ events, page })
      );
    } else {
      getEvents(this.state.lat, this.state.lon, this.state.page).then(events =>
        this.setState({ events })
      );
    }
  };
  render() {
    return (
      <div className="App">
        <Container fluid={true} className="header">
          <Row className="headerBg">
            <Col className="headerContent">
              <h2>Find Peeps Who Enjoy What You Enjoy!</h2>
              <br />
              <br />

              <CitySearch updateEvents={this.updateEvents} />
              <br />
              <br />
            </Col>
          </Row>
        </Container>

        <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 10,
              right: 10,
              bottom: 20,
              left: 10
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="date" name="date" />
            <YAxis type="number" dataKey="number" name="number of events" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#91b7fa" />
          </ScatterChart>
        </ResponsiveContainer>

        <br />
        <div className="numberOfEventsWrapper">
          <NumberOfEvents updateEvents={this.updateEvents} />
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
