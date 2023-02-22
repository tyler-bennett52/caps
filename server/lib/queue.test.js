'use strict';

const Queue = require('./queue');


describe('Queue Class', () => {
  it('Can store/read/remove as needed', () => {
    const Q = new Queue();
    Q.store('Color', 'Blue');
    Q.store('Kitten', 'Tiger');
    Q.store('Doggo', 'Spike');
    expect(Q.remove('Kitten')).toBe('Tiger');
    expect(Q.read('Doggo')).toBe('Spike');
  })
})