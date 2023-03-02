'use strict'

require('dotenv').config();
const { io } = require('socket.io-client');
const socket = io(`http://localhost:${process.env.PORT}/caps`);
const Chance = require('chance');
const chance = new Chance();

socket.emit('join', 'messages');

socket.on('received', (payload) => {
  console.log('Messenger: receipt confirmed', payload);
  let text = payload.text.split(' ').pop();
  console.log(`Receipt confirmed for: ${text}`);
});

setInterval(() => {
  const payload = {
    text: `Hi ${chance.first()}`,
    queueId: 'messages',
    messageId: chance.guid(),
  };
  console.log('Sending message:', payload.text);
  socket.emit('message', payload);
}, 1500);


// socket.on('message', (payload) => {
//   console.log('SERVER: Message event', payload);
//   let currQueue = messageQueue.read(payload.qId);
//   if(!currQueue) {
//     let queueKey = messageQueue.store(payload.qId, new Queue());
//     currQueue = messageQueue.read(queueKey)
//   }
//   currQueue.store(payload.messageId, payload);
// });


// socket.on('received', () => {
//   console.log('Server RECEIVED event', payload);
//   let currQueue = messageQueue.read(payload.qId);
//   if(!currQueue) { throw new Error ('No Q')}
//   let message = currQueue.remove(payload.messageId);
  
  
  
//   socket.broadcast.emit('received', payload);
// });