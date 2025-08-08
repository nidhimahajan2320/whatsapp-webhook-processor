const express = require('express');
const bodyParser = require('body-parser');
const processPayload = require('./processpayloads');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Route to handle POST requests from webhook
app.post('/webhook', async (req, res) => {
  const payload = req.body;
  console.log('🔔 Webhook hit!');
  await processPayload(payload);
  res.status(200).send('Payload received and processed');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});