'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3006/caps');

const Chance = require('chance');
const chance = new Chance();


const confirmDelivery = (payload) => {
  setTimeout(() => {
    console.log(`Thank you for shopping with us ${payload.payload.customer}`)
    socket.emit('deliery-confirmation', payload)
  }, 500);
}

socket.emit('join', 'vendors');
socket.on('delivered', confirmDelivery);
socket.on('successful-join', (room) => console.log('Joined ', room))

const initiatePickup = () => {
  setInterval(() => {
    let payload = {
      event: 'pickup',
      time: Date().slice(0, 24),
      payload: {
        store: `${chance.color()} ${chance.coin()}`,
        orderId: chance.guid(),
        customer: chance.name(),
        address: chance.address(),
      }
    }
    console.log('\nEVENT', payload);


    socket.emit('pickup', payload);

  }, 5000);
};

initiatePickup()

module.exports = confirmDelivery