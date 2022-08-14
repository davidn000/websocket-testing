const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const PORT = 4000 || process.env.PORT;
const io = socketio(server);


io.on('connection', (socket) => {
    console.log('New user connected');
    
    // Initalize the chat
    const payload = "Server > Hello World";
    socket.emit('message', payload);

    // Broadcasts when user connects
    socket.broadcast.emit('message', 'Server > User joined the chat.');

    socket.on('disconnect', () => {
        io.emit('message', 'Server > User left the chat.');
    });

    socket.on('message', (message) => {
        io.emit('message', message);
    });

})

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});