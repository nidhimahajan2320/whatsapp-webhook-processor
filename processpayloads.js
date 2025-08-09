// processpayloads.js
const fs = require('fs');
const path = require('path');
const payloadFile = path.join(__dirname, 'payloads.json');

async function savePayloadToFile(payload) {
  let data = [];
  try {
    if (fs.existsSync(payloadFile)) {
      const existing = fs.readFileSync(payloadFile, 'utf8');
      data = existing ? JSON.parse(existing) : [];
    }
  } catch (err) {
    console.error('Error reading payloads.json:', err);
  }

  // add timestamp and payload
  data.push({
    receivedAt: new Date().toISOString(),
    payload
  });

  try {
    fs.writeFileSync(payloadFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing payloads.json:', err);
    throw err;
  }
}

module.exports = async function processPayload(payload) {
  console.log('✅ processPayload called');
  await savePayloadToFile(payload);
};