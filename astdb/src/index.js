require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { insertIntoAstdbDirect, insertIntoAstdbCommand } = require('./utils');

// Load environment variables
const astdbPath = process.env.ASTDB_PATH;
const mode = process.env.MODE || 'sqlite';

if (!astdbPath) {
  console.error('Error: ASTDB_PATH is not defined in .env file.');
  process.exit(1);
}

// Get JSON file path from arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node src/index.js <json-file>');
  process.exit(1);
}

const jsonFilePath = path.join(__dirname, '..', 'data', args[0]);

// Read and process the JSON file
try {
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

  jsonData.forEach(entry => {
    const { family, key, value } = entry;

    if (mode === 'sqlite') {
      insertIntoAstdbDirect(astdbPath, family, key, value);
    } else if (mode === 'command') {
      insertIntoAstdbCommand(family, key, value);
    } else {
      console.error('Invalid mode. Use "sqlite" or "command".');
    }
  });
} catch (error) {
  console.error('Error processing JSON file:', error.message);
}
