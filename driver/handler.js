'use strict';

const Chance = require('chance');
const chance = new Chance();
let eventPool = require('../eventPool');

const handlePickup = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.payload.orderId}`);
    payload.event = 'in-transit';
    payload.time = Date().slice(0, 24);
    console.log('EVENT: ', payload)
    eventPool.emit('in-transit  ', payload);
    console.log(`DRIVER: delivered ${payload.payload.orderId}`)
    payload.event = 'delivered',
    payload.time = Date().slice(0, 24)
    console.log(`EVENT: `, payload)
    eventPool.emit('delivered', payload)
  }, 500);
}



module.exports = handlePickup
