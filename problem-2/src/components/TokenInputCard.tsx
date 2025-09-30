import React from "react";
import TokenAvatar from "./TokenAvatar";
import type { Token } from "../types";

interface TokenInputCardProps {
  label: string;
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
  label,
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
  return (
    <div className="mb-3">
      <label className="text-sm font-medium text-gray-600 mb-2 block">
        {label}
      </label>
      <div
        className={`bg-gradient-to-br from-${bgGradientFrom} to-${bgGradientTo} rounded-2xl p-4 border border-${borderColor} hover:border-${hoverBorderColor} transition-all`}
      >
        <div className="flex items-center gap-3 mb-3">
          <TokenAvatar
            token={token}
            hasValue={hasValue}
            gradientFrom={avatarGradientFrom}
            gradientTo={avatarGradientTo}
          />
          <div className="flex-1">
            <select
              value={token?.currency || ""}
              onChange={(e) => {
                const selectedToken = tokens.find(
                  (t) => t.currency === e.target.value
                );
                onTokenSelect(selectedToken || null);
              }}
              className="w-full bg-transparent font-semibold text-gray-900 outline-none cursor-pointer"
            >
              <option value="">Select token</option>
              {tokens.map((t) => (
                <option key={t.currency} value={t.currency}>
                  {t.symbol} - {t.name || t.currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end justify-between">
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
            className="text-3xl font-bold bg-transparent outline-none text-gray-900 w-full"
            placeholder="0.0"
            inputMode="decimal"
          />
          {showMaxButton && (
            <button
              onClick={() => onAmountChange("1000000")}
              className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-sm font-semibold transition-colors"
            >
              MAX
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <span className="text-sm text-gray-500">{usdValue}</span>
          {balance && (
            <span className="text-sm text-gray-600">
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
