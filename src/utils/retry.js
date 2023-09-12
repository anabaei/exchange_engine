function exponentialRetry(fn, maxRetries, baseDelay = 1000) {
    return new Promise((resolve, reject) => {
      const retry = (attempt) => {
        fn()
          .then(resolve)
          .catch((error) => {
            if (attempt >= maxRetries) {
              reject(error); // Max retries reached, reject with the last error
            } else {
              const delay = baseDelay * 1.2 ** attempt;
              console.log(`Retry attempt ${attempt + 1} in ${delay / 1000} seconds...`);
              setTimeout(() => retry(attempt + 1), delay);
            }
          });
      };
  
      retry(0); // Start with the first attempt
    });
  }
  
  module.exports = { exponentialRetry };
  