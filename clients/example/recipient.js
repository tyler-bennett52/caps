'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3006');

socket.on('MESSAGE', messageHandler);



function messageHandler(payload) {
  setTimeout(() => {
    console.log('Message Received: ', payload);
    socket.emit('RECEIVED', payload);
  }, 1000);
}