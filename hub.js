'use strict'

const Chance = require('chance');
const chance = new Chance();
const eventPool = require('./eventPool');
const { handlePickup, handleDelivery } = require('./clients/driver/handler');
const vendorHandler = require('./clients/vendor/handler');

eventPool.on('pickup', handlePickup);
eventPool.on('in-transit', handleDelivery);
eventPool.on('delivered', vendorHandler);


