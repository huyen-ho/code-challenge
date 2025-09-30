import { useState, useEffect, useCallback } from "react";
import type { Token, SwapFormData } from "../types";
import {
  getTokensWithPrices,
  calculateSwapRate,
} from "../services/tokenService";

export const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        setError(null);
        const tokensWithPrices = await getTokensWithPrices();
        setTokens(tokensWithPrices);
      } catch (err) {
        setError("Failed to load tokens");
        console.error("Error fetching tokens:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return {
    tokens,
    loading,
    error,
    refetch: () => getTokensWithPrices().then(setTokens),
  };
};

export const useSwap = () => {
  const [formData, setFormData] = useState<SwapFormData>({
    fromToken: null,
    toToken: null,
    fromAmount: "",
    toAmount: "",
    slippage: 0.5,
  });

  const [isSwapping, setIsSwapping] = useState(false);
  const [swapError, setSwapError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    fromAmount?: string;
    toAmount?: string;
    general?: string;
  }>({});

  const validateAmount = (
    amount: string,
    tokenBalance?: number
  ): string | null => {
    if (!amount || amount === "0") return null;

    const numAmount = Number(amount);
    if (isNaN(numAmount)) return "Invalid number format";
    if (numAmount <= 0) return "Amount must be greater than 0";
    if (numAmount > 1000000) return "Amount too large";
    if (tokenBalance && numAmount > tokenBalance) return "Insufficient balance";

    return null;
  };

  const validateForm = useCallback(() => {
    const errors: typeof validationErrors = {};

    if (!formData.fromToken) {
      errors.general = "Please select a token to swap from";
    }
    if (!formData.toToken) {
      errors.general = "Please select a token to swap to";
    }
    if (
      formData.fromToken &&
      formData.toToken &&
      formData.fromToken.currency === formData.toToken.currency
    ) {
      errors.general = "Cannot swap the same token";
    }

    const fromAmountError = validateAmount(formData.fromAmount);
    if (fromAmountError) errors.fromAmount = fromAmountError;

    const toAmountError = validateAmount(formData.toAmount);
    if (toAmountError) errors.toAmount = toAmountError;

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const updateFromAmount = useCallback((amount: string) => {
    setFormData((prev) => {
      const newData = { ...prev, fromAmount: amount };

      if (
        newData.fromToken &&
        newData.toToken &&
        amount &&
        !isNaN(Number(amount))
      ) {
        const rate = calculateSwapRate(newData.fromToken, newData.toToken);
        const toAmount = (Number(amount) * rate).toString();
        newData.toAmount = toAmount;
      } else {
        newData.toAmount = "";
      }

      return newData;
    });

    // Clear validation errors when user types
    setValidationErrors((prev) => ({
      ...prev,
      fromAmount: undefined,
      general: undefined,
    }));
  }, []);

  const updateToAmount = useCallback((amount: string) => {
    setFormData((prev) => {
      const newData = { ...prev, toAmount: amount };

      if (
        newData.fromToken &&
        newData.toToken &&
        amount &&
        !isNaN(Number(amount))
      ) {
        const rate = calculateSwapRate(newData.toToken, newData.fromToken);
        const fromAmount = (Number(amount) * rate).toString();
        newData.fromAmount = fromAmount;
      } else {
        newData.fromAmount = "";
      }

      return newData;
    });

    // Clear validation errors when user types
    setValidationErrors((prev) => ({
      ...prev,
      toAmount: undefined,
      general: undefined,
    }));
  }, []);

  const setFromToken = useCallback((token: Token | null) => {
    setFormData((prev) => {
      const newData = { ...prev, fromToken: token };

      // Recalculate amounts if both tokens are selected
      if (newData.fromToken && newData.toToken && newData.fromAmount) {
        const rate = calculateSwapRate(newData.fromToken, newData.toToken);
        newData.toAmount = (Number(newData.fromAmount) * rate).toString();
      }

      return newData;
    });

    // Clear validation errors when token changes
    setValidationErrors((prev) => ({ ...prev, general: undefined }));
  }, []);

  const setToToken = useCallback((token: Token | null) => {
    setFormData((prev) => {
      const newData = { ...prev, toToken: token };

      // Recalculate amounts if both tokens are selected
      if (newData.fromToken && newData.toToken && newData.fromAmount) {
        const rate = calculateSwapRate(newData.fromToken, newData.toToken);
        newData.toAmount = (Number(newData.fromAmount) * rate).toString();
      }

      return newData;
    });
  }, []);

  const swapTokens = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount,
    }));
  }, []);

  const executeSwap = useCallback(async () => {
    if (!validateForm()) {
      return false;
    }

    if (!formData.fromToken || !formData.toToken || !formData.fromAmount) {
      setSwapError("Please fill in all required fields");
      return false;
    }

    setIsSwapping(true);
    setSwapError(null);

    try {
      // Simulate API call with delay
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 + Math.random() * 1000)
      );

      // Simulate occasional failure (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Swap failed due to network error");
      }

      // Reset form on success
      setFormData((prev) => ({
        ...prev,
        fromAmount: "",
        toAmount: "",
      }));

      return true;
    } catch (error) {
      setSwapError(error instanceof Error ? error.message : "Swap failed");
      return false;
    } finally {
      setIsSwapping(false);
    }
  }, [formData, validateForm]);

  const canSwap =
    formData.fromToken &&
    formData.toToken &&
    formData.fromAmount &&
    !isNaN(Number(formData.fromAmount)) &&
    Number(formData.fromAmount) > 0 &&
    !isSwapping &&
    Object.keys(validationErrors).length === 0;

  return {
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
  };
};
