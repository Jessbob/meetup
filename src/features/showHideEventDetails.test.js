import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import { mockEvents } from "../mock-events";

const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, test => {
  test("AN EVENT ELEMENT IS COLLAPSED BY DEFAULT", ({ given, when, then }) => {
    let AppWrapper;
    given("event details collapsed by default", () => {
      AppWrapper = mount(<App />);
    });

    when("the user sees list of events", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".Event")).toHaveLength(mockEvents.events.length);
    });

    then(
      "details are hidden by default to not show irrelevant data to the users",
      () => {
        expect(AppWrapper.find("expanded")).toHaveLength(0);
      }
    );
  });

  test("USER CAN EXPAND AN EVENT TO SEE ITS DETAILS", ({
    given,
    and,
    when,
    then
  }) => {
    let AppWrapper;
    given("events are collapsed by default", () => {
      AppWrapper = mount(<App />);
    });

    and("events are showing", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".Event")).toHaveLength(mockEvents.events.length);
    });
    when("a user finds an event they are interested in", () => {
      AppWrapper.find(".Event .details-btn")
        .at(0)
        .simulate("click");
    });

    then("details for that event will be displayed", () => {
      expect(AppWrapper.find(".Event .extra")).toHaveLength(1);
    });
  });

  test("USER CAN COLLAPSE AN EVENT TO HIDE ITS DETAILS", ({
    given,
    when,
    then
  }) => {
    let AppWrapper;
    AppWrapper = mount(<App />);
    given(
      "event details are being displayed for the event the user selected",
      () => {
        AppWrapper.update();
        AppWrapper.find(".Event .details-btn")
          .at(0)
          .simulate("click");
        expect(AppWrapper.find(".Event .extra")).toHaveLength(1);
      }
    );

    when("the user is done with those details", () => {
      AppWrapper.find(".Event .details-btn")
        .at(0)
        .simulate("click");
    });

    then("the details will be hidden again", () => {
      expect(AppWrapper.find(".Event .extra")).toHaveLength(0);
    });
  });
});
