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
      className="flex flex-wrap justify-center gap-x-[4px] md:gap-x-3 text-[13px] 2xl:text-[15px]"
    >
      {data.map((entry, index) => (
        <div key={index} className="flex items-center mb-2">
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
