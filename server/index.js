'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3006

const server = new Server();

const namespace = server.of('/caps');

namespace.on('connection', (socket) => {
  console.log('Socket connected to namespace', socket.id);
  // socket.onAny()????
  
  socket.on('JOIN', (room) => {
    console.log('these are the rooms', socket.adapter.rooms);
    console.log('---payload is the room');
    socket.join(room);
  })
})

server.on('connection', (socket) => {
  console.log('Socket connected to Event Server!, Socket ID: ', socket.id);

  socket.on('MESSAGE', (payload) => {
    console.log('SERVER: Message event', payload);

    // // 3 emission methods
    // socket.emit('MESSAGE', payload); // basic emit back to sender
    // server.emit('MESSAGE', payload) // send to all clients on server
    socket.broadcast.emit('MESSAGE', payload) // to all except sender
    
socket.on('RECEIVED', () => {
  console.log('Server RECEIVED event', payload)
})

  });
});

const listen = () => {
  server.listen(PORT);
  console.log('listening on port:', PORT)

}

listen();