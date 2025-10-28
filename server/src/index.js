import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authroute from "./routes/auth.route.js";
import messageroute from "./routes/message.route.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5050;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authroute);
app.use("/api/message", messageroute);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`🟢 Socket connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`📥 Socket ${socket.id} joined room ${room}`);
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(`📤 Socket ${socket.id} left room ${room}`);
  });

  socket.on("message", (message) => {
    console.log(`💬 Message from ${socket.id} in room ${message.room}: ${message.text}`);
    io.to(message.room).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Socket disconnected: ${socket.id}`);
  });
});

// Connect DB then start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect DB:", err);
});
