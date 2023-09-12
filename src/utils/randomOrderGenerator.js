function randomOrderGenerator(orderId) {
  const symbols = ['BTC', 'ETH', 'XRP', 'LTC', 'ADA']; 
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

module.exports = randomOrderGenerator;