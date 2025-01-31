const express = require("express");
const {
  getMessages,
  sendMessage,
  deleteMessage,
  toggleFavorite,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/:department", getMessages);
router.post("/", sendMessage);
router.delete("/:id", deleteMessage);
router.put("/:id/favorite", toggleFavorite);

module.exports = router;
