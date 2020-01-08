Feature: SHOW/HIDE AN EVENT'S DETAILS

    Scenario: AN EVENT ELEMENT IS COLLAPSED BY DEFAULT
        Given event details collapsed by default
        When the user sees list of events
        Then details are hidden by default to not show irrelevant data to the users

    Scenario: USER CAN EXPAND AN EVENT TO SEE ITS DETAILS
        Given events are collapsed by default
        And events are showing
        When a user finds an event they are interested in
        Then details for that event will be displayed

    Scenario: USER CAN COLLAPSE AN EVENT TO HIDE ITS DETAILS
        Given event details are being displayed for the event the user selected
        When the user is done with those details
        Then the details will be hidden again
