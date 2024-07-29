import React from 'react';
import { TooltipProps } from 'recharts';

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const {
      name,
      value,
      payload: { color }
    } = payload[0];

    return (
      <div className="bg-white border border-gray-300 rounded-lg p-2.5 shadow-lg">
        <p style={{ margin: '0', fontWeight: 'bold', color: color }}>{name}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
