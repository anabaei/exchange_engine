# Simplified Distributed Exchange

## Running the Application

### Installation
Install the required dependencies:
```bash
npm i
```
## Running Server and Client
* To run the server and client components, follow these steps (start with the server):

```bash
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```
* Start the server:
```bash
npm run start:server
```
* Start the client:
```bash
npm run start:client
```
## Testing
* To ensure the reliability and correctness of the system, run the provided tests:
```bash
npm test
```
### Save & Search
* It save orders in hash table an instance of `OrderCurrency` class. 

<details>
     <summary> Details ...</summary>

## Saving Orders in the Hash Table

- Each order is stored in the `orderHashTable` within the `OrderCurrency` class.
- Every order is assigned a unique hash key based on its characteristics: `side`, `quantity`, and `type`. For instance, "btusell50" signifies a "sell 50 btu" order.
- Queuing: If a new order arrives with the same key, such as "sell 50 btu," it will join a queue of similar orders.

## Quick Searching with O(1) Complexity

- Searching within the hash table has a time complexity of O(1), indicating high efficiency. You only need to construct a `searchKey` by combining `side`, `quantity`, and `type`.
- Once a match is found during the search, the order is promptly removed from the `orderHashTable` object.

</details>

### Race Conditions & Fault Tolerance
* This project address race conditions using  `async-mutex`  and `Async/Await`
* By creating  `exponentialRetry` function increases the fault tolerance and improve availability 

<details>
     <summary> Details </summary>

 This project addresses them in two ways:

* 1. Using `async-mutex` for Request Locking and Matching
   - We utilize the `async-mutex` library to implement locks on requests and matching. This ensures that multiple operations don't interfere with each other, enhancing system stability.

* 2. Deploying `Async/Await` in Order Submission as an Array of Objects
   - We implement asynchronous processing of orders by submitting them as an array of objects. This approach improves concurrency and helps manage order submissions effectively.

### Enhancing Fault Tolerance
To increase the fault tolerance of the system and ensure high availability while preventing excessive network load due to retry requests, we employ the `submitOrdersWithRetry` function. This function retries order submissions when network or connection issues occur.

</details>

### Orders & Response
* Orders have strucutred schema and reponses are expected to be in 3 formats

<details>
   <summary> Details </summary>

### Orders
* Orders should be structured as objects with the following properties:
```javascript
   {
    orderId: 3,
    symbol: 'ETH', 
    quantity: 50,
    price: 2700.00,
    side: 'sell',
    orderType: 'market', 
  }
```
### Output
* The output messages fall into three main categories when no errors occur:
* 1- Order Successfully Added to Order Book
```bash
Your sell  order for 50 ETH has been added to the order book. You are at the front of the queue.
```
* 2- Order Added to Queue. This message indicates that your order has been added to a queue, and you're in a specific position within that queue.
```bash
Your sell order for 50 BTC  has been added to the order book. You are in position 2 in the queue.
```
* 3- Order Matched for Exchange. This message signifies that your order found a match for an exchange, so it didn't go into the queue and was processed immediately.
```bash
Your purchase of 50 sell has been successfully completed.
```
</details>