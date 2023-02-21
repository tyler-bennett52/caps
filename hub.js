'use strict'

const Chance = require('chance');
const chance = new Chance();
const eventPool = require('./eventPool');
const driverHandler = require('./driver/handler');
const vendorHandler = require('./vendor/handler');

eventPool.on('REQUEST_DELIVERY', driverHandler);
eventPool.on('IN_TRANSIT', vendorHandler);
eventPool.on('DELIVERY', vendorHandler);
const eventList = ['REQUEST_DELIVERY','IN_TRANSIT', 'DELIVERED'];

setInterval(() => {
console.log(`Vendor requests delivery at ${Date().slice(0, 24)}\n`);
let payload =  {
  store: `${chance.color()} ${chance.coin()}`,
  orderId: chance.guid(),
  customer: chance.name(),
  address: chance.address(),
}

eventPool.emit('REQUEST_DELIVERY', payload);
  
}, 5000);

module.exports = eventList;