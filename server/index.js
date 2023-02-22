'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3006

const server = new Server();

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to caps', socket.id);
  // socket.onAny(console.log(payload));

  socket.on('join', (room) => {
    socket.join(room);
    console.log('successful join to room ', room);
    socket.to('vendors').emit('initiate-pickup', 'vendors')
  });
  

  socket.on('pickup', (payload) => {
  
    console.log('EVENT:', payload)
    caps.emit('pickup', payload);
  })

  socket.on('in-transit', (payload) => {
    console.log(`\nDRIVER: picked up ${payload.payload.orderId}`)
    console.log('EVENT:', payload)
    caps.emit('in-transit', payload);
  })

  socket.on('delivered', (payload) => {
    console.log(`\nDRIVER: delivered ${payload.payload.orderId}`)
    console.log('EVENT:', payload)
    caps.emit('delivered', payload)
  })

  socket.on('delivery-confirmation', (payload) => {
    console.log(`\nThank you for shopping with us ${payload.payload.customer}\n`)
  })
})

server.on('connection', (socket) => {
  console.log('Socket connected to Event Server!, Socket ID: ', socket.id);

  socket.on('pickup', (payload) => {
    console.log('SERVER: pickup', payload);
    socket.broadcast.emit('in-transit', payload)
    
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