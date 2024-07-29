import { ArrowGreenUp } from '../../../../assets/Dashboard_1';
import React from 'react';
import { ArrowRedDown } from '../../../../assets/Dashboard_1/ArrowRedDown';

interface CustomLabelListProps {
  data: { name: string; value: number; color: string; difference: number | null }[];
  textColor?: string;
  fontSize?: string;
}
const customLabelList =
  (
    data: { name: string; value: number; color: string; difference: number | null }[],
    textColor?: string,
    fontSize?: string
  ): React.FC<CustomLabelListProps> =>
  ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const difference =
      data[index].difference && data[index].difference > 0 ? (
        <tspan>+({data[index].difference})</tspan>
      ) : data[index].difference < 0 ? (
        <tspan>-({data[index].difference})</tspan>
      ) : null;

    return (
      <g>
        <text x={x} y={y} fill={textColor} fontSize={fontSize} textAnchor="middle" dominantBaseline="central">
          <tspan x={x} dy="-0.5em" className="w-[100px]">
            {data[index].name}
          </tspan>
          <tspan x={x} dy="1.2em">
            {data[index].value} {difference}
          </tspan>
        </text>
        {data[index].difference > 0 ? (
          <foreignObject x={x - 60} y={y}>
            <ArrowGreenUp />
          </foreignObject>
        ) : data[index].difference < 0 ? (
          <foreignObject x={x - 60} y={y}>
            <ArrowRedDown />
          </foreignObject>
        ) : null}
      </g>
    );
  };

export default customLabelList;
