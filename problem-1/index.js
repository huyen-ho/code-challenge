/**
 Problem 1: Three ways to sum to n
 * @author: Huyen Ho
 * @date: 2025-09-29
*/

/**
 * Validation and base case helper function
 * @param {number} n - The number to validate and check for base cases
 * @returns {number|null} Returns the base case value or null if not a base case
 * @throws {Error} If input is not a non-negative integer
 */
const validateInput = (n) => {
  if (n === undefined || n === null) {
    throw new Error("Input is required");
  }
  if (!Number.isInteger(n)) {
    throw new Error("Input must be an integer");
  }
  if (n < 0) {
    throw new Error("Input must be a non-negative integer");
  }
};

/**
 * Mathematical Formula Approach (O(1) time complexity)
 * @param {number} n - The upper limit (must be a non-negative integer)
 * @returns {number} Sum of numbers from 1 to n
 */
const sum_to_n_a = (n) => {
  try {
    validateInput(n);
    return (n * (n + 1)) / 2;
  } catch (error) {
    console.error(`Error in sum_to_n_a: ${error.message}`);
    throw error;
  }
};

/**
 * Iterative Approach (O(n) time complexity)
 * @param {number} n - The upper limit (must be a non-negative integer)
 * @returns {number} Sum of numbers from 1 to n
 */
const sum_to_n_b = (n) => {
  try {
    validateInput(n);

    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }

    return sum;
  } catch (error) {
    console.error(`Error in sum_to_n_b: ${error.message}`);
    throw error;
  }
};

/**
 * Recursive Approach with Memoization (O(n) time complexity)
 * Uses recursion with caching to prevent redundant calculations
 * @param {number} n - The upper limit (must be a non-negative integer)
 * @returns {number} Sum of numbers from 1 to n
 */
const sum_to_n_c = (() => {
  const memo = new Map();

  const recursiveSum = (n) => {
    // Base cases
    if (n === 0) return 0;
    if (n === 1) return 1;

    // Check memoization cache
    if (memo.has(n)) {
      return memo.get(n);
    }

    // Calculate and cache result
    const result = n + recursiveSum(n - 1);
    memo.set(n, result);
    return result;
  };

  return function sum_to_n_c(n) {
    try {
      validateInput(n);

      return recursiveSum(n);
    } catch (error) {
      console.error(`Error in sum_to_n_c: ${error.message}`);
      throw error;
    }
  };
})();

/**
 * Performance comparison utility
 * Measures execution time for each approach
 * @param {number} n - The number to test with
 */
const performanceTest = (n) => {
  console.log(`\n=== Performance Test for n = ${n} ===`);

  // Test Formula Approach
  const startFormula = performance.now();
  const resultFormula = sum_to_n_a(n);
  const endFormula = performance.now();

  // Test Iterative Approach
  const startIterative = performance.now();
  const resultIterative = sum_to_n_b(n);
  const endIterative = performance.now();

  // Test Recursive Approach
  const startRecursive = performance.now();
  const resultRecursive = sum_to_n_c(n);
  const endRecursive = performance.now();

  console.log(`Formula approach (sum_to_n_a):   ${resultFormula} (${(endFormula - startFormula).toFixed(4)}ms)`);
  console.log(`Iterative approach (sum_to_n_b): ${resultIterative} (${(endIterative - startIterative).toFixed(4)}ms)`);
  console.log(`Recursive approach (sum_to_n_c): ${resultRecursive} (${(endRecursive - startRecursive).toFixed(4)}ms)`);
};

// Example usage and demonstration
console.log("=== Sum to N Calculator ===");
console.log("Three different approaches to calculate 1 + 2 + 3 + ... + n\n");

console.log("\n=== VALID TEST CASES ===");
// Test with various valid inputs
const validTestCases = [5, 10, 100, 1000];

validTestCases.forEach((n) => {
  console.log(`\n--- Testing with valid input n = ${n} ---`);
  console.log(`Formula approach (sum_to_n_a):   ${sum_to_n_a(n)}`);
  console.log(`Iterative approach (sum_to_n_b): ${sum_to_n_b(n)}`);
  console.log(`Recursive approach (sum_to_n_c): ${sum_to_n_c(n)}`);
});

// Error handling demonstration
console.log("\n=== INVALID TEST CASES ===");

// Test with various invalid inputs
const invalidTestCases = [undefined, null, "a", 20.01, -1];

invalidTestCases.forEach((n) => {
  console.log(`\n--- Testing with invalid input n = ${n} ---`);
  try {
    sum_to_n_a(n);
  } catch (error) {
    console.log("Message: ", error.message);
  }
  try {
    sum_to_n_b(n);
  } catch (error) {
    console.log("Message: ", error.message);
  }
  try {
    sum_to_n_c(n);
  } catch (error) {
    console.log("Message: ", error.message);
  }
});

// Performance comparison for larger numbers
performanceTest(1000);
performanceTest(10000);

// Export functions for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateInput,
    sum_to_n_a,
    sum_to_n_b,
    sum_to_n_c,
    performanceTest,
  };
}
