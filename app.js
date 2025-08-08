const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const processPayload = require('./processpayloads');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/whatsapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(' Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  const payload = req.body;
  await processPayload(payload);
  res.status(200).send('Message received');
});

app.listen(3000, () => {
  console.log(' Server is running on http://localhost:3000');
});