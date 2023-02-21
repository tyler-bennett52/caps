'use strict';

const eventPool = require('../eventPool');

module.exports = (payload) => {
setTimeout(() => {
  console.log(`Package Delivered ${Date().slice(0, 24)}`, payload);
  eventPool.emit('DELIVERED', payload);
  
}, 500);

}