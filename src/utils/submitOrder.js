const { PeerRPCClient } = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');

const link = new Link({
    grape: 'http://127.0.0.1:30001'
  });
  link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

function submitOrder(order) {
    return new Promise((resolve, reject) => {
      peer.request('rpc_test', order, { timeout: 10000 }, (err, data) => {
        if (err) {
          console.error(err.message);
          reject(err); // Reject the Promise with the error
        } else {
          console.log('Order response:', data);
          resolve(data); // Resolve the Promise with the data
        }
      });
    });
  }
  
  module.exports = submitOrder;
  