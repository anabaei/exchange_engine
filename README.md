# Simplified Distributed Exchange

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
## Saving and Searching Orders

- Save orders in the hash table as instances of the `OrderCurrency` class.

<details>
     <summary> Details </summary>

#### Saving Orders in the Hash Table

- Each order is saved within the `orderHashTable` in the `OrderCurrency` class.
- Every order receives a distinct hash key determined by its attributes: `side`, `quantity`, and `type`. For example, "btusell50" represents a "sell 50 btu" order.
- Queuing: When a new order shares the same key, like "sell 50 btu," it will be placed in a queue alongside similar orders.


#### Efficient O(1) Search Capability

- Searching within the hash table boasts an impressive time complexity of O(1), signifying remarkable efficiency. All that's required is the creation of a `searchKey` through the combination of `side`, `quantity`, and `type`.
- As soon as a match is identified during the search, the order is promptly removed from the `orderHashTable` object.

</details>

## Race Conditions & Enhancing Fault Tolerance

- To tackle race conditions, this project employs the use of `async-mutex` and the `Async/Await` pattern.
- Furthermore, the introduction of the `exponentialRetry` function significantly bolsters fault tolerance, thereby improving system availability.

<details>
     <summary> Details </summary>


* 1. Using `async-mutex` for Request Locking and Matching
   - We utilize the `async-mutex` library to implement locks on requests and matching. This ensures that multiple operations don't interfere with each other, enhancing system stability.

* 2. Deploying `Async/Await` in Order Submission as an Array of Objects
   - We implement asynchronous processing of orders by submitting them as an array of objects. This approach improves concurrency and helps manage order submissions effectively.

#### Enhancing Fault Tolerance
To increase the fault tolerance of the system and ensure high availability while preventing excessive network load due to retry requests, we employ the `submitOrdersWithRetry` function. This function retries order submissions when network or connection issues occur.

</details>

## Orders and Responses
* Orders adhere to a structured schema, and responses are expected to manifest in three distinct formats.


<details>
   <summary> Details </summary>

#### Orders
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
#### Output
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

## Errors & Logs
* To handle error I use logger file, we can log level and log format the errors and save into log file

## Areas to improve
* Orders type could be `limit`, `stop-loss` and `take-profit` and add appropriate logic for each
* Take advantage of `grenache-nodejs-ws` 
* Announce more workers like currency updates
* Encryp & Decrypt hashed keys
* Add authentication and userId on orders
* Devide orders into smaller pieces and allow partial fill 
* Add `TTL` on orders and handle the logic 
 
