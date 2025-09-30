import React, { useState } from "react";
import TokenAvatar from "@/components/TokenAvatar";
import TokenDropdown from "@/components/TokenDropdown";
import type { Token } from "@/types";

interface TokenInputCardProps {
  token: Token | null;
  amount: string;
  tokens: Token[];
  onTokenSelect: (token: Token | null) => void;
  onAmountChange: (amount: string) => void;
  usdValue: string;
  balance?: string;
  showMaxButton?: boolean;
  readOnly?: boolean;
  error?: string;
  gradientFrom?: string;
  gradientTo?: string;
  bgGradientFrom?: string;
  bgGradientTo?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  avatarGradientFrom?: string;
  avatarGradientTo?: string;
  hasValue?: boolean;
}

const TokenInputCard: React.FC<TokenInputCardProps> = ({
  token,
  amount,
  tokens,
  onTokenSelect,
  onAmountChange,
  usdValue,
  balance,
  showMaxButton = false,
  readOnly = false,
  error,
  hasValue = false,
  bgGradientFrom = "gray-50",
  bgGradientTo = "gray-100/50",
  borderColor = "gray-200",
  hoverBorderColor = "indigo-300",
  avatarGradientFrom = "blue-500",
  avatarGradientTo = "indigo-600",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTokenSelect = (selectedToken: Token) => {
    onTokenSelect(selectedToken);
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className={`bg-gradient-to-br from-${bgGradientFrom} to-${bgGradientTo} rounded-2xl p-4 border border-${borderColor} hover:border-${hoverBorderColor} transition-all`}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-3">
          <TokenAvatar
            token={token}
            hasValue={hasValue}
            gradientFrom={avatarGradientFrom}
            gradientTo={avatarGradientTo}
            size="sm"
          />
          <TokenDropdown
            token={token}
            tokens={tokens}
            onTokenSelect={handleTokenSelect}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            className="flex-1"
          />
        </div>

        <div className="flex items-end justify-between gap-2">
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              // Only allow numbers and decimal point
              if (value === "" || /^\d*\.?\d*$/.test(value)) {
                onAmountChange(value);
              }
            }}
            readOnly={readOnly}
            className="text-2xl sm:text-3xl font-bold bg-transparent outline-none text-gray-900 w-full min-w-0"
            placeholder="0.0"
            inputMode="decimal"
          />
          {showMaxButton && (
            <button
              onClick={() => onAmountChange("1000000")}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex-shrink-0"
            >
              MAX
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-3 border-t border-gray-200 gap-1 sm:gap-0">
          <span className="text-xs sm:text-sm text-gray-500">{usdValue}</span>
          {balance && (
            <span className="text-xs sm:text-sm text-gray-600">
              Balance: <span className="font-semibold">{balance}</span>
            </span>
          )}
        </div>

        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default TokenInputCard;
