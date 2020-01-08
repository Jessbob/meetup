Feature: SPECIFY NUMBER OF EVENTS
    Scenario: WHEN USER HASN’T SPECIFIED A NUMBER, 32 IS THE DEFAULT NUMBER
        Given the default number of events are being displayed
        When no number has been specified by the user
        Then the number of events displayed is the default
    Scenario: USER CAN CHANGE THE NUMBER OF EVENTS THEY WANT TO SEE
        Given the number of events listed is the default
        When the user enters a specific number of events to display
        Then the number of events displayed will equal the user specified amount
