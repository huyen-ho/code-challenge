import React from "react";

interface StatsCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-white/60 backdrop-blur rounded-xl p-3 border border-gray-100 hover:border-indigo-200 transition-all">
      {icon && <div className="flex justify-center mb-2">{icon}</div>}
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  );
};

export default StatsCard;
