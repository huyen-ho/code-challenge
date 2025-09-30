import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import type { Token } from "@/types";

interface TokenDropdownProps {
  token: Token | null;
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const TokenDropdown: React.FC<TokenDropdownProps> = ({
  token,
  tokens,
  onTokenSelect,
  isOpen,
  onToggle,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const filteredTokens = tokens.filter(
    (t) =>
      t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (selectedToken: Token) => {
    onTokenSelect(selectedToken);
    onToggle();
    setSearchQuery("");
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between bg-transparent font-semibold text-gray-900 outline-none cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-2">
          {token ? (
            <>
              <span className="text-sm sm:text-base">{token.symbol}</span>
              <span className="hidden sm:inline text-sm text-gray-500 font-normal truncate max-w-24 md:max-w-32">
                {token.name}
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-sm sm:text-base">
              Select token
            </span>
          )}
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-hidden">
          {/* Search Header */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Token List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((t, index) => (
                <div key={t.currency}>
                  <button
                    type="button"
                    onClick={() => handleSelect(t)}
                    className="w-full px-3 sm:px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center space-x-3">
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
                        <div className="font-semibold text-gray-900 text-base">
                          {t.symbol}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {t.name}
                        </div>
                      </div>
                      {t.price && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-medium text-gray-900">
                            ${t.price.toFixed(t.price > 1 ? 2 : 6)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="xs:hidden">
                      <div className="flex space-x-3 mb-2">
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
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {t.symbol}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {t.name}
                            </div>
                          </div>
                          {t.price && (
                            <div className="mt-1">
                              <div className="text-xs font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded inline-block">
                                ${t.price.toFixed(t.price > 1 ? 2 : 6)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                  {/* Divider - don't show after last item */}
                  {index < filteredTokens.length - 1 && (
                    <div className="border-b border-gray-100 mx-3 sm:mx-4"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="text-sm">No tokens found</div>
                <div className="text-xs mt-1">Try a different search term</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenDropdown;
