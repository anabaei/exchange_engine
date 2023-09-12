const {exponentialRetry} = require('./exponentialRetry')

function submitOrdersWithRetry(submitOrder,orders, maxRetries, retryDelay) {
    // Create an array of promises for submitting orders with retry
    const orderPromises = orders.map((order) => {
      return exponentialRetry(() =>submitOrder(order), maxRetries, retryDelay);
    });
  
    // Use Promise.all to wait for all orders to complete (with or without retries)
    return Promise.all(orderPromises);
  }
  
  module.exports = submitOrdersWithRetry;