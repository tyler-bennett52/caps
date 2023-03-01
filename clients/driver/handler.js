'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const socket = io(`http://localhost:${process.env.PORT}/caps`);

const handlePickup = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.payload.orderId}`);
    payload.event = 'in-transit';
    payload.time = Date().slice(0, 24);
    console.log('EVENT: ', payload)
    socket.emit('in-transit', payload);

  }, 500);
}

const handleDelivery = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.payload.orderId}`)
    payload.event = 'delivered',
      payload.time = Date().slice(0, 24)
    console.log(`EVENT: `, payload)
    socket.emit('delivered', payload)
  }, 500);
}

socket.on('initiate-pickup', () => {
  console.log('THIS SHOULD NOT BE IN THE CONSOLE')
})
socket.on('pickup', handlePickup);
socket.on('in-transit', handleDelivery);



module.exports = { handlePickup, handleDelivery }
