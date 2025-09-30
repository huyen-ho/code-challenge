import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import type { Token } from "../types";

interface TokenSelectorProps {
  selectedToken: Token | null;
  tokens: Token[];
  onSelect: (token: Token) => void;
  label: string;
  className?: string;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  tokens,
  onSelect,
  label,
  className = "",
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

  const handleSelect = (token: Token) => {
    onSelect(token);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="currency-selector w-full justify-between min-w-[140px]"
      >
        <div className="flex items-center space-x-2">
          {selectedToken ? (
            <>
              <img
                src={selectedToken.logoURI}
                alt={selectedToken.symbol}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  (
                    e.target as HTMLImageElement
                  ).src = `https://via.placeholder.com/24x24/3B82F6/FFFFFF?text=${selectedToken.symbol.charAt(
                    0
                  )}`;
                }}
              />
              <span className="font-semibold text-gray-900">
                {selectedToken.symbol}
              </span>
              <span className="text-sm text-gray-500">
                {selectedToken.name}
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <button
                  key={token.currency}
                  type="button"
                  onClick={() => handleSelect(token)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    onError={(e) => {
                      (
                        e.target as HTMLImageElement
                      ).src = `https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=${token.symbol.charAt(
                        0
                      )}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">
                      {token.symbol}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {token.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      ${token.price!.toFixed(token.price! > 1 ? 2 : 6)}
                    </div>
                  </div>
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
  );
};

export default TokenSelector;
