'use strict';
const submitOrder = require('./utils/submitOrder');
const submitOrdersWithRetry = require('./submitOrderWithRetry');

async function main() {
  // Example orders
  const order1 = {
    orderId: 2,
    symbol: 'BTC', 
    quantity: 50,
    price: 2700.00,
    side: 'sell',
    orderType: 'market', 
  };

  const order2 = {
    orderId: 3,
    symbol: 'ETH', 
    quantity: 50,
    price: 2700.00,
    side: 'buy',
    orderType: 'market', 
  };
  const order3 = {
    orderId: 3,
    symbol: 'ETH', 
    quantity: 50,
    price: 2700.00,
    side: 'sell',
    orderType: 'market', 
  };
  const order4 = {
    orderId: 3,
    symbol: 'ETH', 
    quantity: 50,
    price: 2700.00,
    side: 'sell',
    orderType: 'market', 
  };

  const orders = [order1, order2, order3, order4];

  try {
    // Submit the orders with retry
    const results = await submitOrdersWithRetry(submitOrder, orders, 5, 1000);
    console.log('Response of the order:', results);
  } catch (error) {
    console.error('Max retries reached. Error:', error.message);
  }
}

main();