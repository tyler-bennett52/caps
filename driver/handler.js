'use strict';

const Chance = require('chance');
const chance = new Chance();
let eventPool = require('../eventPool');

module.exports = (payload) => {
  setTimeout(() => {
    console.log(`Package picked up at - ${Date().slice(0, 24)}\n` , payload);
    payload.driver = {driverName: chance.name(), orderID: chance.guid()}
    eventPool.emit('IN_TRANSIT', payload);
  }, 500);
}
