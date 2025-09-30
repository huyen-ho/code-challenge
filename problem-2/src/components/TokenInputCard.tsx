import React, { useState, useRef, useEffect } from "react";
import TokenAvatar from "@/components/TokenAvatar";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (selectedToken: Token) => {
    onTokenSelect(selectedToken);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div>
      <div
        className={`bg-gradient-to-br from-${bgGradientFrom} to-${bgGradientTo} rounded-2xl p-4 border border-${borderColor} hover:border-${hoverBorderColor} transition-all`}
      >
        <div className="flex items-center gap-3 mb-3" ref={dropdownRef}>
          <TokenAvatar
            token={token}
            hasValue={hasValue}
            gradientFrom={avatarGradientFrom}
            gradientTo={avatarGradientTo}
          />
          <div className="flex-1 relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between bg-transparent font-semibold text-gray-900 outline-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                {token ? (
                  <>
                    <span>{token.symbol}</span>
                    <span className="text-sm text-gray-500 font-normal">
                      {token.name}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500">Select token</span>
                )}
              </div>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tokens..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredTokens.length > 0 ? (
                    filteredTokens.map((t) => (
                      <button
                        key={t.currency}
                        type="button"
                        onClick={() => handleSelect(t)}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <img
                          src={t.logoURI}
                          alt={t.symbol}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900">
                            {t.symbol}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {t.name}
                          </div>
                        </div>
                        {t.price && (
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              ${t.price.toFixed(t.price > 1 ? 2 : 6)}
                            </div>
                          </div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      No tokens found
                    </div>
                  )}
                </div>
              </div>
            )}
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
