

class Queue {
  constructor() {
    this.data = {};
  }

  store(key, value) {
    this.data[key] = value;
    console.log('Message added to Queue');
    return key
  }

  read(key) {
    return this.data[key];
  }

  remove(key) {
    console.log('Message was removed from Queue');
    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

module.exports = Queue;
