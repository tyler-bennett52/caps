'use strict';

const PORT = require('../../server/halp');
const { io } = require('socket.io-client');
const socket = io(`http://localhost:${PORT}/caps`);

const Chance = require('chance');
const chance = new Chance();


socket.emit('join', '1-800-flowers');
socket.emit('get-all', {id: '1-800-flowers'});
socket.on('initiate-pickup', initiatePickup);
socket.on('delivered', confirmDelivery);
socket.on('successful-join', (room) => console.log('Joined ', room))

function initiatePickup() {
    let payload = {
      event: 'pickup',
      time: Date().slice(0, 24),
      payload: {
        store: '1-800-flowers',
        orderId: chance.guid(),
        customer: chance.name(),
        address: chance.address(),
      }
    }
    console.log('\nEVENT', payload);
    socket.emit('pickup', payload);
};


function confirmDelivery(payload) {
  setTimeout(() => {
    console.log(`Thank you for shopping with us ${payload.payload.customer}`);
    socket.emit('delivery-confirmation', payload);
    socket.emit('received', {id: '1-800-flowers', messageId: payload.payload.orderId})
    // process.exit();
  }, 500);
}


module.exports = confirmDelivery