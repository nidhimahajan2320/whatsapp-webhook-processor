const express = require('express');
const mongoose = require('mongoose');
const processPayload = require('./processPayloads');

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    await processPayload(req.body);
    res.status(200).send('Message received and processed!');
  } catch (error) {
    console.error('Error processing payload:', error.message);
    res.status(400).send('Bad Request: ' + error.message);
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});