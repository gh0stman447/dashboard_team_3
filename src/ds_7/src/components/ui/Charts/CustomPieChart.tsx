import React, { FC, ReactElement } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { IDifferenceData, IPieData } from '../../../models';

type pieRadius = string | number;

const CustomPieChart = ({
  data,
  innerRadius = 0,
  outerRadius = '100%',
  legend,
  tooltip,
  label,
  animationData = {
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease-out'
  }
}: {
  data: (IPieData & IDifferenceData)[];
  innerRadius: pieRadius;
  outerRadius: pieRadius;
  legend?: ReactElement;
  tooltip?: ReactElement;
  label?: FC;
  animationData?: { animationBegin: number; animationDuration: number; animationEasing: string };
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          label={label}
          labelLine={false}
          {...animationData}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip content={tooltip} />
        <Legend content={legend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
