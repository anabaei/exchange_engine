class Order { 
    constructor(orderId, symbol, quantity, price, side, orderType, orderedAt) {
      this.orderId = orderId;
      this.symbol = symbol;
      this.quantity = quantity;
      this.price = price;
      this.side = side;           // buy, sell
      this.orderType = orderType; // market, limit,  stop-loss, take-profit
      this.orderedAt = orderedAt;  // timestamp
    }
  }
  
  module.exports = Order;
  