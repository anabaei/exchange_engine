# Simplified Distributed Exchange


## Running the Application

### Installation
Install the required dependencies:
```bash
npm i
```
## Running Server and Client
* To run the server and client components, follow these steps (start with the server):

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
### Addressing Race Conditions
Race conditions can create issues in a distributed exchange system. This project addresses them in two ways:

* 1. Using `async-mutex` for Request Locking and Matching
   - We utilize the `async-mutex` library to implement locks on requests and matching. This ensures that multiple operations don't interfere with each other, enhancing system stability.

* 2. Deploying `Async/Await` in Order Submission as an Array of Objects
   - We implement asynchronous processing of orders by submitting them as an array of objects. This approach improves concurrency and helps manage order submissions effectively.

### Enhancing Fault Tolerance
To increase the fault tolerance of the system and ensure high availability while preventing excessive network load due to retry requests, we employ the `submitOrdersWithRetry` function. This function retries order submissions when network or connection issues occur.
