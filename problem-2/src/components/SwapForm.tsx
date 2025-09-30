import React, { useState } from "react";
import {
  ArrowsUpDownIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import TokenSelector from "./TokenSelector";
import CurrencyInput from "./CurrencyInput";
import SwapRate from "./SwapRate";
import LoadingSpinner from "./LoadingSpinner";
import ValidationMessage from "./ValidationMessage";
import { useTokens, useSwap } from "../hooks/useSwap";

const SwapForm: React.FC = () => {
  const { tokens, loading: tokensLoading, error: tokensError } = useTokens();
  const {
    formData,
    updateFromAmount,
    updateToAmount,
    setFromToken,
    setToToken,
    swapTokens,
    executeSwap,
    isSwapping,
    swapError,
    canSwap,
    validationErrors,
    validateForm,
  } = useSwap();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSwap = async () => {
    if (!validateForm()) {
      return;
    }

    const success = await executeSwap();
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (tokensLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading tokens...</p>
        </div>
      </div>
    );
  }

  if (tokensError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">{tokensError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Token Swap</h1>
          <p className="text-gray-600">Exchange your tokens instantly</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
            <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Swap Successful!</p>
              <p className="text-sm text-green-700">
                Your tokens have been exchanged.
              </p>
            </div>
          </div>
        )}

        {/* Swap Form */}
        <div className="swap-card p-6 space-y-6">
          {/* From Token */}
          <div className="space-y-4">
            <TokenSelector
              selectedToken={formData.fromToken}
              tokens={tokens}
              onSelect={setFromToken}
              label="From"
            />
            <CurrencyInput
              label=""
              value={formData.fromAmount}
              onChange={updateFromAmount}
              token={formData.fromToken}
              error={validationErrors.fromAmount}
              maxAmount={1000000}
              minAmount={0.000001}
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swapTokens}
              className="p-3 border-4 border-white bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg"
            >
              <ArrowsUpDownIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* To Token */}
          <div className="space-y-4">
            <TokenSelector
              selectedToken={formData.toToken}
              tokens={tokens.filter(
                (token) => token.currency !== formData.fromToken?.currency
              )}
              onSelect={setToToken}
              label="To"
            />
            <CurrencyInput
              label=""
              value={formData.toAmount}
              onChange={updateToAmount}
              token={formData.toToken}
              error={validationErrors.toAmount}
              readonly={true}
            />
          </div>

          {/* Swap Rate */}
          <SwapRate fromToken={formData.fromToken} toToken={formData.toToken} />

          {/* Validation Errors */}
          {validationErrors.general && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-yellow-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-yellow-700">{validationErrors.general}</p>
            </div>
          )}

          {/* Error Message */}
          {swapError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{swapError}</p>
            </div>
          )}

          {/* Swap Execute Button */}
          <button
            type="button"
            onClick={handleSwap}
            disabled={!canSwap}
            className="swap-button w-full flex items-center justify-center space-x-2"
          >
            {isSwapping && <LoadingSpinner size="sm" />}
            <span>{isSwapping ? "Swapping..." : "Swap Tokens"}</span>
          </button>

          {/* Interactive Tips */}
          {!formData.fromToken && !formData.toToken && (
            <ValidationMessage
              type="info"
              message="💡 Tip: Select two different tokens to see live exchange rates and start swapping!"
              className="mt-4"
            />
          )}

          {formData.fromToken && !formData.toToken && (
            <ValidationMessage
              type="info"
              message="👍 Great! Now select the token you want to receive."
              className="mt-4"
            />
          )}

          {formData.fromToken && formData.toToken && !formData.fromAmount && (
            <ValidationMessage
              type="info"
              message="📝 Enter the amount you want to swap. The conversion will be calculated automatically!"
              className="mt-4"
            />
          )}

          {/* Transaction Details */}
          {formData.fromToken && formData.toToken && formData.fromAmount && (
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Slippage Tolerance</span>
                <span>0.5%</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Network Fee</span>
                <span>~$2.50</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Time</span>
                <span>~30 seconds</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by Huyen Ho</p>
          <p className="mt-1">Built with ❤️ using Vite + React + TypeScript</p>
        </div>
      </div>
    </div>
  );
};

export default SwapForm;
