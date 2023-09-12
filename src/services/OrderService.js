const Order = require('../models/Order');
const OrderCurrency = require('../models/OrderCurrency'); 

class OrderService {
  constructor() {
    this.orderCurrency = new OrderCurrency(); 
  }

  async submitOrder(payload) {
    const  {orderId, symbol, quantity, price, side, orderType, orderedAt} = payload
    try {
      const order = await this.createOrder(orderId, symbol, quantity, price, side, orderType, orderedAt);
      const result = await this.orderCurrency.addOrder(order);

      return result; 
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error; 
    }
  }

  async createOrder(orderId, symbol, quantity, price, side, orderType, orderedAt) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = new Order(orderId, symbol, quantity, price, side, orderType, orderedAt);
        resolve(order);
      }, 1000); 
    });
  }

}

module.exports = OrderService;
