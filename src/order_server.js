'use strict';

const { PeerRPCServer } = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const Mutex = require('async-mutex').Mutex;
const logger = require('./logger');

const OrderService = require('./services/OrderService');
const orderService = new OrderService();

const link = new Link({
  grape: 'http://127.0.0.1:30001',
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport('server');
service.listen(port);

const mutex = new Mutex();

setInterval(function () {
  link.announce('rpc_test', service.port, {});
}, 1000);

service.on('request', async (rid, key, payload, handler) => {
  try {
    const release = await mutex.acquire();
    try {
      payload.orderedAt= Date.now();
      
      // Submit an order
      const result = await orderService.submitOrder(payload);
      handler.reply(null, {message: result});
    } finally {
      release();
    }
  } catch (error) {
    logger.error('Error processing order:', error);
    handler.reply({ error: 'Order processing error' });
  }
});
