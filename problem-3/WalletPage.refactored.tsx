/**
 * Problem 3: Messy React (Refactored)
 * @author: Huyen Ho
 * @date: 2025-09-30
 * @description: Refactored production-ready version with all 12 bugs fixed
 * @improvements: Performance optimization, type safety, proper React patterns
 */

import React, { useMemo } from "react";
import { BoxProps } from "@mui/material";

// Define proper types for blockchain networks
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

// Fixed: Added missing 'blockchain' property
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

// Extended interface for formatted balances
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Optimization: Use Record for O(1) priority lookups instead of switch statement
  const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };

  // Fixed: Changed parameter type from 'any' to 'string'
  const getPriority = (blockchain: string): number => {
    return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
  };

  // Major Optimization: Combined filter, sort, and format into single useMemo
  // This prevents multiple iterations and redundant getPriority calls
  const formattedBalances = useMemo(() => {
    return (
      balances
        // Step 1: Map to include priority (calculate once per item)
        .map((balance: WalletBalance) => ({
          ...balance,
          priority: getPriority(balance.blockchain),
        }))
        // Step 2: Filter - Fixed inverted logic (now keeps amount > 0)
        // Fixed: Changed 'lhsPriority' to use the correct variable
        .filter((balance) => {
          return balance.priority > -99 && balance.amount > 0;
        })
        // Step 3: Sort by priority (descending) - Fixed incomplete comparator
        .sort((lhs, rhs) => rhs.priority - lhs.priority)
        // Step 4: Format amounts and calculate USD values
        .map(
          (balance): FormattedWalletBalance => ({
            ...balance,
            formatted: balance.amount.toFixed(2),
            usdValue: prices[balance.currency] * balance.amount,
          })
        )
    );
  }, [balances, prices]); // Fixed: Now includes 'prices' correctly since it's used

  // Render rows from formatted balances
  // Fixed: Using formattedBalances instead of sortedBalances
  // Fixed: Using unique key instead of array index
  const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
    return (
      <WalletRow
        // Fixed: Using unique composite key instead of array index
        key={`${balance.blockchain}-${balance.currency}`}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
