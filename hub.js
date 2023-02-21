'use strict'

const Chance = require('chance');
const chance = new Chance();
const eventPool = require('./eventPool');
const driverHandler = require('./driver/handler');
const vendorHandler = require('./vendor/handler');

eventPool.on('pickup', driverHandler);
eventPool.on('in-transit', vendorHandler);
eventPool.on('delivered', vendorHandler);

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


  eventPool.emit('pickup', payload);

}, 5000);
