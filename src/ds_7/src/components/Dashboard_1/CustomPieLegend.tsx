import React from 'react';

interface LegendProps {
  data: { name: string; color: string }[];
  legendWidth?: number | string;
  legendItemHeight?: number;
}

const CustomPieLegend: React.FC<LegendProps> = ({ data, legendWidth = '200px', legendItemHeight = 30 }) => {
  return (
    <div
      style={{ width: legendWidth }}
      className="flex flex-wrap justify-center gap-x-3 text-[10px] md-lg:text-[16px] 2xl:text-[20px]"
    >
      {data.map((entry, index) => (
        <div key={index} className="flex items-center gap-1">
          <div
            className="w-2.5 h-2.5 rounded-full border border-black mr-1"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span>{entry.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomPieLegend;
