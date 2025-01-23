Feature: Insert register using sqlite direct access

    Background: Asterisk database access

    ASTDB is sqlite an asterisk SQLITE 3 database with key,value fields.
    The register is inserted as stated below:
    key: /family/key
    value: value

    Scenario: Insert json registers using direct access

        When run app on sqlite mode

        Then read the input json file

        And access ASTDB database and insert registers based on each json file array items.




