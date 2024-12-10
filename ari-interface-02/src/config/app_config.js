const fs = require('fs');
const path = require('path');

// Get instance ID or fallback to 0
const instanceId = parseInt(process.env.NODE_APP_INSTANCE, 10) || 0;

// Build the path to the config file for this instance
const configPath = path.join(__dirname, `../../configs/config_instance_${instanceId}.json`);
let config = {};

try {
	const rawData = fs.readFileSync(configPath, 'utf-8');
	config = JSON.parse(rawData);
} catch (error) {
	console.error(`Error loading configuration: ${error.message}`);
	process.exit(1);
}

module.exports = {
	restApiPort: config.restApiPort || 3000,
	audioDir: config.audioDir || './audio',
	chimeFile: config.chimeFile || 'chime.mp3',
	sipServerUri: config.sipServer || '192.168.25.81',
	sipUsername: config.sipUsername || 'claude',
	sipPassword: config.sipPassword || 'shannon',
	reconnectInterval: config.reconnectInterval || 10,
};
