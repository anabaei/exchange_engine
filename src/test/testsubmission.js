const submitOrdersWithRetry = require('../src/submitOrderWithRetry')
const submitOrder = require('../src/utils/submitOrder');

function generateRandomOrder(orderId) {
    const symbols = ['BTC', 'ETH', 'XRP', 'LTC', 'ADA']; // Add more symbols if needed
    const sides = ['buy', 'sell'];
    const orderTypes = ['limit', 'market', 'stop-loss', 'take-profit'];
  
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomSide = sides[Math.floor(Math.random() * sides.length)];
    const randomOrderType = orderTypes[Math.floor(Math.random() * orderTypes.length)];
  
    return {
      orderId,
      symbol: randomSymbol,
      quantity: Math.floor(Math.random() * 100) + 1, 
      price: (Math.random() * 10000).toFixed(2), 
      side: randomSide,
      orderType: randomOrderType,
    };
  }
  
  async function testOrderSubmission() {
    const orders = [];
  
    // Generate 4 random orders
    for (let i = 1; i <= 4; i++) {
      const order = generateRandomOrder(i);
      orders.push(order);
    }
  
    try {
      // Submit the orders with retry
      const results = await submitOrdersWithRetry(submitOrder, orders, 5, 1000);
      
      // Print the response of the last order
      console.log('Response of the last order:', results[results.length - 1]);
    } catch (error) {
      console.error('Max retries reached. Error:', error.message);
    }
  }
  
  // Call the test function
  testOrderSubmission();
  