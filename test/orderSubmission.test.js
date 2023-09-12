const { expect } = require("chai");
const sinon = require("sinon"); // For mocking functions

// Import the functions you want to test
const generateRandomOrder = require("../src/utils/randomOrderGenerator");
const submitOrdersWithRetry = require("../src/submitOrderWithRetry");

// Import the submitOrder function and mock it
const submitOrder = sinon.stub();
submitOrder.resolves(
  "Your buy order for 7 BTC has been added to the order book. You are at the front of the queue."
);

describe("Order Submission", () => {
  it("should submit orders and return the response of the last order", async () => {
    const orders = [
      generateRandomOrder(1),
      generateRandomOrder(2),
      generateRandomOrder(3),
    ];

    // Mock the submitOrder function to resolve with a message
    submitOrder.onCall(0).resolves("Order 1 success");
    submitOrder.onCall(1).resolves("Order 2 success");
    submitOrder.onCall(2).resolves("Order 3 success");

    try {
      const results = await submitOrdersWithRetry(submitOrder, orders, 5, 1000);

      // Assert that the results contain the response of the last order
      expect(results).to.be.an("array");
      expect(results).to.have.lengthOf(3); // Make sure all orders were submitted
      expect(results[results.length - 1]).to.equal("Order 3 success"); // Adjust this line for your message format
    } catch (error) {
      // Handle errors if needed
      throw error;
    }
  });
  it("submit orders and verify exchange has been done successfully ", async () => {
    const orders = [
      {
        orderId: 1,
        symbol: "BTC", 
        quantity: 50,
        price: 2700.0,
        side: "sell",
        orderType: "market", 
      },
      {
        orderId: 2,
        symbol: "ETH", 
        quantity: 50,
        price: 2700.0,
        side: "buy",
        orderType: "market",
      },
      {
        orderId: 3,
        symbol: "ETH", 
        quantity: 50,
        price: 2700.0,
        side: "sell",
        orderType: "market",
      },
    ];

    // Mock the submitOrder function to resolve with a message
    submitOrder.onCall(0).resolves("Order 1 success");
    submitOrder.onCall(1).resolves("Order 2 success");
    submitOrder.onCall(2).resolves("Order 3 success");

    try {
      const results = await submitOrdersWithRetry(submitOrder, orders, 5, 1000);
      // Assert that the results contain the response of the last order
      expect(results[results.length - 1]).to.equal("Your buy order for 7 BTC has been added to the order book. You are at the front of the queue."); // Adjust this line for your message format
    } catch (error) {
      // Handle errors if needed
      throw error;
    }
  });
});
