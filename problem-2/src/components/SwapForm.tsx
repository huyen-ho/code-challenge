import React, { useMemo, useCallback, useEffect } from "react";
import { ArrowDownUp, Info, XCircle } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import TokenInputCard from "@/components/TokenInputCard";
import { useTokens, useSwap } from "@/hooks/useSwap";
import { calculateSwapRate } from "@/services/tokenService";

const SwapForm: React.FC = () => {
  const { tokens, loading: tokensLoading, error: tokensError } = useTokens();
  const {
    formData,
    updateFromAmount,
    setFromToken,
    setToToken,
    swapTokens,
    swapError,
    validationErrors,
  } = useSwap();

  // Set default tokens when tokens are loaded
  useEffect(() => {
    if (tokens.length > 0 && !formData.fromToken && !formData.toToken) {
      // Set default tokens: USDC as from token and ETH as to token
      const defaultFromToken =
        tokens.find(
          (token) => token.currency === "USDC" || token.symbol === "USDC"
        ) || tokens[0]; // Fallback to first token if USDC not found

      const defaultToToken =
        tokens.find(
          (token) => token.currency === "ETH" || token.symbol === "ETH"
        ) ||
        tokens[1] ||
        tokens[0]; // Fallback to second token or first if only one available

      // Only set different tokens
      if (
        defaultFromToken &&
        defaultToToken &&
        defaultFromToken.currency !== defaultToToken.currency
      ) {
        setFromToken(defaultFromToken);
        setToToken(defaultToToken);
      } else if (defaultFromToken) {
        setFromToken(defaultFromToken);
        // Set toToken to the first different token
        const differentToken = tokens.find(
          (t) => t.currency !== defaultFromToken.currency
        );
        if (differentToken) {
          setToToken(differentToken);
        }
      }
    }
  }, [tokens, formData.fromToken, formData.toToken, setFromToken, setToToken]);

  // Utility function for USD value calculation
  const calculateUsdValue = useCallback(
    (token: typeof formData.fromToken, amount: string) => {
      if (!token || !amount || !token.price) return "$0.00";
      const value = Number(amount) * token.price;
      return `≈ $${value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [] // This function doesn't depend on any props/state since it receives all params
  );

  // Memoized USD values for form data
  const fromUsdValue = useMemo(
    () => calculateUsdValue(formData.fromToken, formData.fromAmount),
    [calculateUsdValue, formData.fromToken, formData.fromAmount]
  );

  const toUsdValue = useMemo(
    () => calculateUsdValue(formData.toToken, formData.toAmount),
    [calculateUsdValue, formData.toToken, formData.toAmount]
  );

  // Memoized exchange rates calculation
  const rates = useMemo(() => {
    if (!formData.fromToken || !formData.toToken) return null;
    const rate = calculateSwapRate(formData.fromToken, formData.toToken);
    const reverseRate = 1 / rate;
    return { rate, reverseRate };
  }, [formData.fromToken, formData.toToken]);

  if (tokensLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" color="indigo" className="mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading tokens...</p>
        </div>
      </div>
    );
  }

  if (tokensError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">{tokensError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Token Swap
          </h1>
          <p className="text-gray-500 text-lg">
            Exchange your tokens instantly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-6 border border-gray-100">
          {/* From Section */}
          <TokenInputCard
            token={formData.fromToken}
            amount={formData.fromAmount}
            tokens={tokens}
            onTokenSelect={setFromToken}
            onAmountChange={updateFromAmount}
            usdValue={fromUsdValue}
            balance="1,000,000"
            hasValue={formData.fromToken !== null}
            showMaxButton={true}
            error={validationErrors.fromAmount}
            bgGradientFrom="gray-50"
            bgGradientTo="gray-100/50"
            borderColor="gray-200"
            hoverBorderColor="indigo-300"
            avatarGradientFrom="blue-500"
            avatarGradientTo="indigo-600"
          />

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={swapTokens}
              className="w-12 h-12 bg-white border-4 border-indigo-50 rounded-xl shadow-lg hover:shadow-xl hover:border-indigo-300 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            >
              <ArrowDownUp className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" />
            </button>
          </div>

          {/* To Section */}
          <TokenInputCard
            token={formData.toToken}
            amount={formData.toAmount}
            tokens={tokens.filter(
              (token) => token.currency !== formData.fromToken?.currency
            )}
            onTokenSelect={setToToken}
            onAmountChange={() => {}}
            usdValue={toUsdValue}
            readOnly={true}
            hasValue={formData.toToken !== null}
            error={validationErrors.toAmount}
            bgGradientFrom="purple-50"
            bgGradientTo="indigo-50"
            borderColor="purple-200"
            hoverBorderColor="purple-300"
            avatarGradientFrom="purple-500"
            avatarGradientTo="pink-500"
          />

          {/* Validation Errors */}
          {validationErrors.general && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center space-x-3">
              <Info className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                {validationErrors.general}
              </p>
            </div>
          )}

          {/* Error Message */}
          {swapError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{swapError}</p>
            </div>
          )}

          {/* Exchange Rate Info */}
          {rates && formData.fromToken && formData.toToken && (
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Exchange Rate</span>
                    <span className="font-semibold text-gray-900">
                      1 {formData.fromToken.symbol} = {rates.rate.toFixed(6)}{" "}
                      {formData.toToken.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Reverse Rate</span>
                    <span className="font-semibold text-gray-900">
                      1 {formData.toToken.symbol} ={" "}
                      {rates.reverseRate.toFixed(6)} {formData.fromToken.symbol}
                    </span>
                  </div>
                </div>
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
