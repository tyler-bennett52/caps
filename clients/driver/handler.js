'use strict';

const PORT = require('../../server/halp');
const { io } = require('socket.io-client');
const socket = io(`http://localhost:${PORT}/caps`);

const handlePickup = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.payload.orderId}`);
    payload.event = 'in-transit';
    payload.time = Date().slice(0, 24);
    console.log('EVENT: ', payload)
    socket.emit('in-transit', payload);
    socket.emit('received', {id: 'Driver', messageId: payload.payload.orderId})

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


socket.emit('join', 'Driver');
socket.emit('get-all', {id: 'Driver'})
socket.on('pickup', handlePickup);
socket.on('in-transit', handleDelivery);



module.exports = { handlePickup, handleDelivery }
