import React from "react";
import StatsCard from "./StatsCard";

interface SwapStatsProps {
  gasFee?: string;
  slippage?: string;
  estimatedTime?: string;
  className?: string;
}

const SwapStats: React.FC<SwapStatsProps> = ({
  gasFee = "~$2.50",
  slippage = "0.5%",
  estimatedTime = "~30s",
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-3 gap-4 text-center ${className}`}>
      <StatsCard label="Gas Fee" value={gasFee} />
      <StatsCard label="Slippage" value={slippage} />
      <StatsCard label="Est. Time" value={estimatedTime} />
    </div>
  );
};

export default SwapStats;
