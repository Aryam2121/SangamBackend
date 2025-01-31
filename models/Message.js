const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  department: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, default: new Date().toLocaleTimeString() },
  isFavorite: { type: Boolean, default: false },
});

module.exports = mongoose.model("Message", messageSchema);
