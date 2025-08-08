const express = require("express");
const mongoose = require("mongoose");
const webhookRoutes = require("./routes/webhook");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", webhookRoutes);

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/whatsapp-webhook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
  });
}).catch((error) => {
  console.error("MongoDB connection failed:", error);
});
