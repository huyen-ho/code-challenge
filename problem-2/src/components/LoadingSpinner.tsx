import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "default" | "dots" | "pulse" | "ring";
  color?: "primary" | "indigo" | "purple" | "white";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  variant = "default",
  color = "indigo",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: {
      border: "border-primary-500",
      bg: "bg-primary-500",
      ring: "border-primary-500/30",
    },
    indigo: {
      border: "border-indigo-600",
      bg: "bg-indigo-600",
      ring: "border-indigo-600/30",
    },
    purple: {
      border: "border-purple-600",
      bg: "bg-purple-600",
      ring: "border-purple-600/30",
    },
    white: {
      border: "border-white",
      bg: "bg-white",
      ring: "border-white/30",
    },
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  // Default spinning circle
  if (variant === "default") {
    return (
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-${colorClasses[
          color
        ].border
          .split("-")
          .slice(1)
          .join("-")} ${sizeClasses[size]} ${className}`}
        style={{
          borderTopColor:
            color === "indigo"
              ? "#4f46e5"
              : color === "purple"
              ? "#9333ea"
              : color === "white"
              ? "#ffffff"
              : "#3b82f6",
        }}
      />
    );
  }

  // Three bouncing dots
  if (variant === "dots") {
    return (
      <div className={`flex items-center justify-center gap-1 ${className}`}>
        <div
          className={`${dotSizes[size]} ${colorClasses[color].bg} rounded-full animate-bounce`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`${dotSizes[size]} ${colorClasses[color].bg} rounded-full animate-bounce`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`${dotSizes[size]} ${colorClasses[color].bg} rounded-full animate-bounce`}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    );
  }

  // Pulsing circle
  if (variant === "pulse") {
    return (
      <div
        className={`${sizeClasses[size]} ${colorClasses[color].bg} rounded-full animate-pulse ${className}`}
      />
    );
  }

  // Ring loader (dual ring)
  if (variant === "ring") {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 ${colorClasses[color].ring} animate-spin`}
          style={{
            borderTopColor:
              color === "indigo"
                ? "#4f46e5"
                : color === "purple"
                ? "#9333ea"
                : color === "white"
                ? "#ffffff"
                : "#3b82f6",
            animationDuration: "1s",
          }}
        />
        {/* Inner ring */}
        <div
          className={`absolute inset-1 rounded-full border-2 border-transparent animate-spin`}
          style={{
            borderBottomColor:
              color === "indigo"
                ? "#4f46e5"
                : color === "purple"
                ? "#9333ea"
                : color === "white"
                ? "#ffffff"
                : "#3b82f6",
            animationDuration: "0.75s",
            animationDirection: "reverse",
          }}
        />
      </div>
    );
  }

  return null;
};

export default LoadingSpinner;
