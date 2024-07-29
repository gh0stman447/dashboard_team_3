import React from 'react';
import { ArrowGreenUp } from '../../../../assets/Dashboard_1';
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

    const textOffset = outerRadius + 20;
    const labelX = cx + textOffset * Math.cos(-midAngle * RADIAN);
    const labelY = cy + textOffset * Math.sin(-midAngle * RADIAN);

    const valueOffset = 10;
    const valueX = x;

    const arrowOffset = 30;
    const arrowX = valueX - arrowOffset;
    const arrowY = y;

    const difference =
      data[index].difference && data[index].difference > 0 ? (
        <tspan>+({data[index].difference})</tspan>
      ) : data[index].difference < 0 ? (
        <tspan>-({data[index].difference})</tspan>
      ) : null;

    return (
      <g>
        <path
          d={`M${x},${y}L${labelX},${labelY}`}
          stroke={textColor}
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 3"
        />
        <text x={valueX} y={y} fill={textColor} fontSize={fontSize} textAnchor="middle" dominantBaseline="central">
          {data[index].value} {difference}
        </text>
        <text x={labelX} y={labelY} fill={textColor} fontSize={fontSize} textAnchor="start" dominantBaseline="central">
          {data[index].name}
        </text>
        {data[index].difference > 0 ? (
          <foreignObject x={arrowX - 32} y={arrowY - 11} width="25" height="25">
            <ArrowGreenUp />
          </foreignObject>
        ) : data[index].difference < 0 ? (
          <foreignObject x={arrowX - 32} y={arrowY - 11} width="25" height="25">
            <ArrowRedDown />
          </foreignObject>
        ) : null}
      </g>
    );
  };

export default customLabelList;
