Feature: Insert register using asterisk command line

    Background: Asterisk database command line

    ASTDB is sqlite an asterisk SQLITE 3 database with key,value fields.
    Asterisk has a command line resource to insert the register into ASTDB
    asterisk -rx "database put family key value"
    The register is inserted as stated below:
    key: /family/key
    value: value

    Scenario: Insert json registers using command line

        When run app on command line mode

        Then read the input json file

        And run asterisk put database command and insert registers based on each json file array items




