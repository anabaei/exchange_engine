const Order = require('../models/Order');
const OrderCurrency = require('../models/OrderCurrency'); // Update the import

class OrderService {
  constructor() {
    this.orderCurrency = new OrderCurrency(); // Update the instance creation
  }

  async submitOrder(payload) {
    const  {orderId, symbol, quantity, price, side, orderType, orderedAt} = payload
    try {
      // Simulate an asynchronous operation (e.g., database interaction)
      const order = await this.createOrder(orderId, symbol, quantity, price, side, orderType, orderedAt);

      // Add the order to the order currency
      const result = await this.orderCurrency.addOrder(order);

      // Implement any additional logic for handling orders here

      return result; // Return the order for reference or further processing
    } catch (error) {
      // Handle any errors here
      console.error('Error submitting order:', error);
      throw error; // Re-throw the error to propagate it
    }
  }

  async createOrder(orderId, symbol, quantity, price, side, orderType, orderedAt) {
    // Simulate an asynchronous operation (e.g., database interaction)
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = new Order(orderId, symbol, quantity, price, side, orderType, orderedAt);
        resolve(order);
      }, 1000); // Simulated delay of 1 second
    });
  }

  // Implement more methods for managing orders
}

module.exports = OrderService;
