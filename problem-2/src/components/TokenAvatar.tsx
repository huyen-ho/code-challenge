import React, { useState } from "react";
import type { Token } from "@/types";

interface TokenAvatarProps {
  token: Token | null;
  gradientFrom?: string;
  gradientTo?: string;
  size?: "sm" | "md" | "lg";
  hasValue?: boolean;
}

const TokenAvatar: React.FC<TokenAvatarProps> = ({
  token,
  gradientFrom = "blue-500",
  gradientTo = "indigo-600",
  size = "md",
  hasValue = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-lg",
    lg: "w-12 h-12 text-xl",
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`${sizeClasses[size]} ${
        hasValue
          ? ""
          : `bg-gradient-to-br from-${gradientFrom} to-${gradientTo} shadow-md`
      } rounded-xl flex items-center justify-center overflow-hidden`}
    >
      {token && token.logoURI && !imageError ? (
        <img
          src={token.logoURI}
          alt={token.symbol}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <span className="text-white font-bold">
          {token ? token.symbol.charAt(0) : "?"}
        </span>
      )}
    </div>
  );
};

export default TokenAvatar;
