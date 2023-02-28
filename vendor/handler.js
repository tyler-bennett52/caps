'use strict';

const eventPool = require('../eventPool');

const handleDelivery = (payload) => {
  setTimeout(() => {
    
    console.log(`Thank you for shopping with us ${payload.payload.customer}`)
  }, 500);
}

const oldHandleDelivery = (payload) => {
setTimeout(() => {
  console.log(`Package Delivered ${Date().slice(0, 24)}`, payload);
  eventPool.emit('delivered', payload);
  
}, 500);

}

module.exports = handleDelivery