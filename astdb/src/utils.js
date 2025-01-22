const sqlite3 = require('sqlite3').verbose();
const { exec } = require('child_process');

/**
 * Insert data into ASTDB using SQLite3.
 * @param {string} astdbPath - Path to the SQLite3 database file.
 * @param {string} family - Database family.
 * @param {string} key - Database key.
 * @param {string} value - Database value.
 */
function insertIntoAstdbDirect(astdbPath, family, key, value) {
  // key, value fields
  const full_key = '/' + family + '/' + key;

  const db = new sqlite3.Database(astdbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(`Error opening ASTDB: ${err.message}`);
      return;
    }
  });

  const query = `INSERT INTO astdb (key, value) VALUES (?, ?)`;

  db.run(query, [full_key, value], function (err) {
    if (err) {
      console.error(`Error inserting into ASTDB: ${err.message}`);
    } else {
      console.log(`Inserted: key=${full_key}, value=${value}`);
    }
  });

  db.close((err) => {
    if (err) {
      console.error(`Error closing ASTDB: ${err.message}`);
    }
  });
}

/**
 * Insert data into ASTDB using the Asterisk CLI command.
 * @param {string} family - Database family.
 * @param {string} key - Database key.
 * @param {string} value - Database value.
 */
function insertIntoAstdbCommand(family, key, value) {
  const command = `asterisk -rx "database put ${family} ${key} ${value}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }
    console.log(`Command output: ${stdout.trim()}`);
  });
}

module.exports = { insertIntoAstdbDirect, insertIntoAstdbCommand };
