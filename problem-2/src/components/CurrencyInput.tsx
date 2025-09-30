import React from "react";
import type { Token } from "../types";
import { formatCurrency } from "../services/tokenService";

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  token: Token | null;
  readonly?: boolean;
  className?: string;
  error?: string;
  maxAmount?: number;
  minAmount?: number;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChange,
  token,
  readonly = false,
  className = "",
  error,
  maxAmount,
  minAmount = 0,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow empty value, numbers, and decimal points
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      // Additional validation for decimal places (max 8)
      const decimalParts = newValue.split(".");
      if (decimalParts.length <= 2 && (decimalParts[1]?.length || 0) <= 8) {
        onChange(newValue);
      }
    }
  };

  const getSimulatedBalance = () => {
    // Simulate a random balance between 100-10000 tokens for demo
    if (!token) return 0;
    return Math.floor(Math.random() * 9900) + 100;
  };

  const simulatedBalance = getSimulatedBalance();

  const getValidationError = () => {
    if (!value || value === "0") return null;
    const numValue = Number(value);

    if (isNaN(numValue)) return "Invalid number format";
    if (numValue < minAmount) return `Minimum amount is ${minAmount}`;
    if (maxAmount && numValue > maxAmount)
      return `Maximum amount is ${maxAmount}`;
    if (numValue <= 0) return "Amount must be greater than 0";
    if (!readonly && numValue > simulatedBalance)
      return `Insufficient balance. Available: ${simulatedBalance.toLocaleString()} ${
        token?.symbol || ""
      }`;

    return null;
  };

  const getUSDValue = () => {
    if (!token?.price || !value || isNaN(Number(value))) return null;
    return Number(value) * token.price;
  };

  const validationError = getValidationError();
  const hasError = error || validationError;
  const usdValue = getUSDValue();

  return (
    <div className={`input-group ${className}`}>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        {label}
      </label>
      <div
        className={`bg-gray-50 rounded-xl p-4 border transition-colors ${
          hasError
            ? "border-red-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500"
            : "border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          readOnly={readonly}
          placeholder="0.00"
          aria-label={`${label} amount`}
          aria-describedby={hasError ? `${label}-error` : undefined}
          className={`currency-input ${
            readonly ? "cursor-not-allowed text-gray-500" : ""
          } ${hasError ? "text-red-600" : ""}`}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex-1">
            {usdValue !== null && !hasError && (
              <div className="text-sm text-gray-500">
                ≈ {formatCurrency(usdValue)}
              </div>
            )}
            {token && !token.price && !hasError && value && (
              <div className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded text-center">
                💡 Price data unavailable for calculations
              </div>
            )}
          </div>
          {!readonly && token && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                Balance: {simulatedBalance.toLocaleString()}
              </span>
              <button
                type="button"
                onClick={() => onChange(simulatedBalance.toString())}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition-colors"
              >
                MAX
              </button>
            </div>
          )}
        </div>
        {hasError && (
          <div className="text-sm text-red-600 mt-1 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error || validationError}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyInput;
