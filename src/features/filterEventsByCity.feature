Feature: FILTER EVENTS BY CITY

        Scenario: BY DEFAULT, WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS BASED ON THE USER’S LOCATION.
                Given user hasn’t searched for any city
                When the user opens the app
                Then the user should see the list of upcoming events from their location

        Scenario: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
                Given the main page is open
                When user starts typing in the city textbox
                Then the user should receive a list of cities (suggestions) that match what they’ve typed

        Scenario: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
                Given user is typing “Munich” in the city textbox
                And the list of suggested cities is showing
                When the user selects a city (e.g., “Munich, Germany”) from the list
                Then their city should be changed to that city (i.e., “Munich, Germany”)
                And the user should receive a list of upcoming events in that city