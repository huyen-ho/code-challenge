# Problem 3: Messy React

- @author: Huyen Ho
- @date: 2025-09-30
- @description: Comprehensive code review exercise analyzing a buggy WalletPage component

### 1. Undefined Variable Reference

- **Location**: Line 35
- **Problem**: Variable `lhsPriority` is used but never defined
- **Impact**: Runtime error - ReferenceError will crash the application
- **Fix**: Should be `balancePriority` (defined on line 34)
- **Code**:

```typescript
// Before
const balancePriority = getPriority(balance.blockchain);
if (lhsPriority > -99) {

// After
const balancePriority = getPriority(balance.blockchain);
if (balancePriority > -99) {
```

---

### 2. Inverted Filter Logic

- **Location**: Lines 35-37
- **Problem**: Filter keeps balances with `amount <= 0` (negative/zero) and returns `false` for valid balances
- **Impact**: Only displays wallets with no balance or negative balance, hides all positive balances
- **Fix**: Invert the condition to keep balances > 0
- **Code**:

```typescript
// Before
if (balancePriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
return false;

// After
if (balancePriority > -99 && balance.amount > 0) {
  return true;
}
return false;
```

---

### 3. Missing Property in Interface

- **Location**: Line 1-4
- **Problem**: `WalletBalance` interface missing `blockchain` property but it's used on line 34
- **Impact**: TypeScript compilation error
- **Fix**: Add `blockchain` property to interface
- **Code**:

```typescript
// Before
interface WalletBalance {
  currency: string;
  amount: number;
}

// After
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
```

---

### 4. Type Mismatch in Map Operation

- **Location**: Line 50
- **Problem**: Maps over `sortedBalances` (type `WalletBalance[]`) but types parameter as `FormattedWalletBalance`
- **Impact**: TypeScript error - `formatted` property doesn't exist on `WalletBalance`
- **Fix**: Should map over `formattedBalances` instead, or type correctly
- **Code**:

```typescript
// Before
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  // ...
  formattedAmount={balance.formatted}  // 'formatted' doesn't exist
})

// After
const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
  // ...
  formattedAmount={balance.formatted}  // Now it exists
})
```

---

### 5. Missing Classes Object

- **Location**: Line 53
- **Problem**: References `classes.row` but `classes` is never defined
- **Impact**: Runtime error - Cannot read property 'row' of undefined
- **Fix**: Import/define classes or remove className
- **Code**:

```typescript
// Before
<WalletRow
  className={classes.row}
  // ...
/>;

// After - Option 1 (add import)
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  row: {
    // styles
  },
});
const classes = useStyles();

// After - Option 2 (remove if not needed)
<WalletRow
// ...
/>;
```

---

## Performance Issues

### 6. Incorrect useMemo Dependencies

- **Location**: Line 47
- **Problem**: `prices` is in dependency array but not used in the memoized computation
- **Impact**: Unnecessary recalculations when `prices` changes, causing performance issues
- **Fix**: Remove `prices` from dependency array
- **Code**:

```typescript
// Before
}, [balances, prices]);

// After
}, [balances]);
```

---

### 7. Unused Computed Value

- **Location**: Lines 48-52
- **Problem**: `formattedBalances` is computed but never used (rows uses `sortedBalances` instead)
- **Impact**: Wasted computation on every render
- **Fix**: Remove this computation or use it in the rows mapping
- **Code**:

```typescript
// Before
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
});
const rows = sortedBalances.map(
  (balance: FormattedWalletBalance, index: number) => {
    // This uses sortedBalances, not formattedBalances!
  }
);

// After
const rows = formattedBalances.map(
  (balance: FormattedWalletBalance, index: number) => {
    // Now uses the formatted data
  }
);
```

---

### 8. Multiple Redundant Function Calls

- **Location**: Lines 34, 41-42
- **Problem**: `getPriority()` is called 3 times for each balance (once in filter, twice in sort)
- **Impact**: O(n²) complexity instead of O(n log n), significant performance degradation
- **Fix**: Calculate priority once and store it
- **Code**:

```typescript
// Before
balances
  .filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain); // Call #1
    // ...
  })
  .sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain); // Call #2
    const rightPriority = getPriority(rhs.blockchain); // Call #3
  });

// After
balances
  .map((balance) => ({
    ...balance,
    priority: getPriority(balance.blockchain), // Call once
  }))
  .filter((balance) => balance.priority > -99 && balance.amount > 0)
  .sort((lhs, rhs) => rhs.priority - lhs.priority); // Use stored priority
```

---

### 9. Using Array Index as React Key

- **Location**: Line 54
- **Problem**: Uses array index as key, which breaks React's reconciliation when list changes
- **Impact**: Poor rendering performance, potential state bugs, React warnings
- **Fix**: Use unique identifier like blockchain + currency combination
- **Code**:

```typescript
// Before
key={index}

// After
key={`${balance.blockchain}-${balance.currency}`}
```

---

## Code Quality Issues

### 10. Incomplete Sort Comparator

- **Location**: Lines 41-46
- **Problem**: Sort function doesn't return anything when priorities are equal
- **Impact**: Undefined behavior, unpredictable sorting order
- **Fix**: Return 0 for equal priorities
- **Code**:

```typescript
// Before
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
// Missing return statement!

// After
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
return 0;

// Better - Simplified
return rightPriority - leftPriority;
```

---

### 11. Using 'any' Type

- **Location**: Line 18
- **Problem**: `blockchain` parameter typed as `any`, defeats TypeScript's purpose
- **Impact**: No type safety, potential runtime errors
- **Fix**: Use proper string literal union type
- **Code**:

```typescript
// Before
const getPriority = (blockchain: any): number => {

// After
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';
const getPriority = (blockchain: string): number => {
```

---

### 12. Missing Import

- **Location**: Line 9
- **Problem**: `Props` extends `BoxProps` but `BoxProps` is never imported
- **Impact**: TypeScript compilation error
- **Fix**: Import from Material-UI or remove extends
- **Code**:

```typescript
// Before
interface Props extends BoxProps {}

// After
import { BoxProps } from "@mui/material";
interface Props extends BoxProps {}
```
