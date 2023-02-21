'use strict';

const { io } = require('socket.io-client');
const socket = io('htp://localhost:3006');
const Chance = require('chance');
const chance = new Chance();

setInterval(() => {
  const text = `Hey ${chance.name}, just wanted to notify you bank password just changed. To receive your new one please respond to this message with your PIN.`;
  console.log('Sending message', text);
  socket.emit('MESSAGE');
}, 3000);