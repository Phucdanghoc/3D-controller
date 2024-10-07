// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.1.1:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use(cors());
io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on('message', (data) => {
        console.log('Message from client:', data);
        socket.broadcast.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    socket.on('zoomval', (value) => {
        socket.broadcast.emit("zoomval", value);
    });
    socket.on('cursor_position', (value) => {
        console.log(value.x)
        socket.broadcast.emit("cursor_position", value);
    });
    socket.on('reset_positon', () => {
        socket.broadcast.emit("reset_positon");
    });
    socket.on('device_name', (data) => {
        console.log('Device name:', data);
        socket.broadcast.emit('app_connected_to_web', data);
    });
});
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`WebSocket server running at http://localhost:${PORT}`);
});
