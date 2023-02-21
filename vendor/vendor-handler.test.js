'use strict'

const eventPool = require('../eventPool');
const vendorHandler = require('./handler');

const payload = {
  event: 'pickup',
  time: Date().slice(0, 24),
  payload: {
    store: 'rgba(16,114,155,0.3822) tails',
    orderId: '1d35e094-d8cd-51ce-b363-ef5ffd0b9fa0',
    customer: 'Maurice Mathis',
    address: '1925 Gaki Square'
  }

}

// jest.mock('../eventPool.js', () => {
//   return {
//     on: jest.fn(),
//     emit: jest.fn(),
//   }
// })
console.log = jest.fn();

describe('Simulated Vendor', () => {
  it('Simulates deliery completion, logs thank you message', () => {
    vendorHandler(payload);
    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith(`Thank you for shopping with us ${payload.payload.customer}`)
    }, 1000);
  })
})
