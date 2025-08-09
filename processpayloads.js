// processpayloads.js
const fs = require('fs');
const path = require('path');
const payloadFile = path.join(__dirname, 'payloads.json');

function ensurePayloadFile() {
  if (!fs.existsSync(payloadFile)) fs.writeFileSync(payloadFile, '[]', 'utf8');
}

async function savePayload(payload) {
  ensurePayloadFile();
  let arr = [];
  try {
    const raw = fs.readFileSync(payloadFile, 'utf8');
    arr = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading payloads.json', e);
  }

  arr.push({
    receivedAt: new Date().toISOString(),
    payload
  });

  fs.writeFileSync(payloadFile, JSON.stringify(arr, null, 2), 'utf8');
}

module.exports = async function processPayload(payload) {
  console.log('processPayload called — saving payload to payloads.json');
  await savePayload(payload);
};