import React from "react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { calculateSwapRate, formatNumber } from "@/services/tokenService";
import type { Token } from "@/types";

interface SwapRateProps {
  fromToken: Token | null;
  toToken: Token | null;
  className?: string;
}

const SwapRate: React.FC<SwapRateProps> = ({
  fromToken,
  toToken,
  className = "",
}) => {
  if (!fromToken || !toToken || !fromToken.price || !toToken.price) {
    return null;
  }

  const rate = calculateSwapRate(fromToken, toToken);
  const reverseRate = calculateSwapRate(toToken, fromToken);

  return (
    <div
      className={`flex items-center justify-center space-x-3 py-3 px-4 bg-gray-50 rounded-lg ${className}`}
    >
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="font-medium">
          1 {fromToken.symbol} = {formatNumber(rate)} {toToken.symbol}
        </span>
        <ArrowsRightLeftIcon className="w-4 h-4 text-gray-400" />
        <span className="font-medium">
          1 {toToken.symbol} = {formatNumber(reverseRate)} {fromToken.symbol}
        </span>
      </div>
    </div>
  );
};

export default SwapRate;
