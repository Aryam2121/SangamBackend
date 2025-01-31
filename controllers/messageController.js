const Message = require("../models/Message");

// Get all messages for a department
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ department: req.params.department });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Toggle favorite status
const toggleFavorite = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    message.isFavorite = !message.isFavorite;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getMessages, sendMessage, deleteMessage, toggleFavorite };
