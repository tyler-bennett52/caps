'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3006
const server = new Server();
const caps = server.of('/caps');
const Queue = require('./lib/queue');
const messageQueue = new Queue();

caps.on('connection', (socket) => {
  console.log('Socket connected to caps', socket.id);
  // socket.onAny(console.log(payload));
  // console.log(messageQueue.data)

  socket.on('join', (room) => {
    socket.join(room);
    console.log('successful join to room ', room);
    caps.to(room).emit('initiate-pickup', room)
  });



  socket.on('pickup', (payload) => {
    console.log('EVENT:', payload)
    let currQueue = messageQueue.read('Driver');
    if(!currQueue) {
      let queueKey = messageQueue.store('Driver', new Queue());
      currQueue = messageQueue.read(queueKey);
    }
    currQueue.store(payload.payload.orderId, payload);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    console.log(`\nDRIVER: picked up ${payload.payload.orderId}`)
    console.log('EVENT:', payload)
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log(`\nDRIVER: delivered ${payload.payload.orderId}`);
    console.log('EVENT:', payload);
    let currQueue = messageQueue.read(payload.payload.store);
    if(!currQueue) {
      let queueKey = messageQueue.store(payload.payload.store, new Queue());
      currQueue = messageQueue.read(queueKey)
    }
    currQueue.store(payload.payload.orderId, payload);
    caps.to(payload.payload.store).emit('delivered', payload);
  });

  socket.on('delivery-confirmation', (payload) => {
    console.log(`\nThank you for shopping with us ${payload.payload.customer}\n`)
  });

  socket.on('received', (payload) => {
    let currQueue = messageQueue.read(payload.id);
    if(!currQueue) {
      throw new Error('There\'s no there there');
    } 
    
    let removed = currQueue.remove(payload.messageId);
    console.log(removed)
  })

  socket.on('get-all', (payload) => {
    console.log(payload)
    let currQueue = messageQueue.read(payload.id);
    console.log(currQueue);
    if (currQueue && currQueue.data) {
      Object.keys(currQueue.data).forEach(message => {
        if (payload.id !== 'Driver') {
          caps.emit('delivered', currQueue.read(message));
        } else {
          socket.emit('pickup', currQueue.read(message))
        }
      });
    }
  })
})

server.on('connection', (socket) => {
  console.log('Socket connected to Event Server!, Socket ID: ', socket.id);

  // socket.on('pickup', (payload) => {
  //   console.log('SERVER: pickup', payload);
  //   socket.broadcast.emit('in-transit', payload)
  // });


});

const listen = () => {
  server.listen(PORT);
  console.log('listening on port:', PORT)
}



listen();

function selectQueue(qId) {
  let currQueue = messageQueue.read(qId);
  if(!currQueue) {
    let queueKey = messageQueue.store(qId, new Queue());
    currQueue = messageQueue.read(queueKey)
    return currQueue;
  }
}
