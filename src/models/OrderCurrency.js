class OrderCurrency {
  constructor() {
    this.orderHashTable = {};
  }

  // Add the order to the order book
  async addOrder(order) {
    // create hash key
    const reqSide = order.side.toLowerCase() === "buy" ? "sell" : "buy";
    const searchKey = order.symbol + order.quantity + reqSide;
    const hashKey = order.symbol + order.quantity + order.side;

    if (this.orderHashTable.hasOwnProperty(searchKey)) {
      delete this.orderHashTable[searchKey];
      return `Your purchase of ${order.quantity} ${order.side} has been successfully completed.`
    } else {
      if (this.orderHashTable.hasOwnProperty(hashKey)) {
        this.orderHashTable[hashKey].push(order);
        return `Your ${order.side} order for ${order.quantity} ${order.symbol}  has been added to the order book. You are in position ${this.orderHashTable[hashKey].length} in the queue.`
      } else {
        this.orderHashTable[hashKey] = [order];
        return `Your ${order.side}  order for ${order.quantity} ${order.symbol} has been added to the order book. You are at the front of the queue.`
      }
    }
  }
}

module.exports = OrderCurrency;
