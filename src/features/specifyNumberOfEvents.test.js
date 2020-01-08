import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import { mockEvents } from "../mock-events";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
  test("WHEN USER HASN’T SPECIFIED A NUMBER, 32 IS THE DEFAULT NUMBER", ({
    given,
    when,
    then
  }) => {
    let AppWrapper;
    given("the default number of events are being displayed", () => {});

    when("no number has been specified by the user", () => {
      AppWrapper = mount(<App />);
    });

    then("the number of events displayed is the default", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".Event").length).toBeLessThanOrEqual(32);
    });
  });

  test("USER CAN CHANGE THE NUMBER OF EVENTS THEY WANT TO SEE", ({
    given,
    when,
    then
  }) => {
    let AppWrapper;
    given("the number of events listed is the default", () => {
      AppWrapper = mount(<App />);
    });

    when("the user enters a specific number of events to display", () => {
      const eventNumber = { target: { value: 3 } };
      AppWrapper.find(".NumberOfEvents").simulate("change", eventNumber);
    });

    then(
      "the number of events displayed will equal the user specified amount",
      () => {
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        expect(NumberOfEventsWrapper.state("number")).toBe(32);
      }
    );
  });
});
