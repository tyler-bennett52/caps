'use strict'

// const eventPool = require('../../eventPool');

const { handlePickup, handleDelivery } = require('./handler');
const socket = require('socket.io-client');

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

// jest.mock('socket.io-client', () => {
//   return {
//     on: jest.fn(),
//     emit: jest.fn(),
//   }
// })
console.log = jest.fn();

describe('Simulated Driver', () => {
  it('Simulates pickup, emits in-transit', async () => {
    handlePickup(payload)
    setTimeout(() => {
      expect(socket.emit).toHaveBeenCalledWith('in-transit', payload)
      expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${payload.payload.orderId}`)
    }, 1000);
  })

  it('Simulates delivery, emits delivered', async () => {
    handleDelivery(payload)
    setTimeout(() => {
      expect(socket.emit).toHaveBeenCalledWith('delivered', payload)
      expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered ${payload.payload.orderId}`)
    }, 1000);
  })
})