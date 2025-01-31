require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
const Message = require("./models/Message"); 

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/messages", messageRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinDepartment", async (department) => {
    const messages = await Message.find({ department }); 
    socket.emit("messageHistory", messages);
    socket.join(department);
  });

  socket.on("sendMessage", async (message) => {
    try {
      const newMessage = new Message(message); 
      await newMessage.save();
      io.to(message.department).emit("newMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
