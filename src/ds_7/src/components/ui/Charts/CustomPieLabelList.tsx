import React from 'react';
import { ArrowGreenUp, ArrowRedDown } from '../../../../assets';

interface CustomLabelListProps {
  data: { name: string; value: number; color: string; difference: number | null }[];
  textColor?: string;
  fontSize?: string;
}

const CustomPieLabelList =
  (
    data: { name: string; value: number; color: string; difference: number | null }[],
    textColor?: string,
    fontSize?: string
  ): React.FC<CustomLabelListProps> =>
  ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.8;

    const textX = cx + (radius - 20) * Math.cos(-midAngle * RADIAN);
    const textY = cy + (radius - 20) * Math.sin(-midAngle * RADIAN);

    const valueText = data[index].value.toString();
    const differenceText = data[index].difference !== null ? `(${data[index].difference})` : '';
    const textLength = valueText.length + differenceText.length;
    const arrowOffset = 10 + textLength * 1.2;

    const arrowX = textX - arrowOffset;
    const arrowY = textY - (fontSize ? parseFloat(fontSize) / 2 : 10);

    const difference =
      data[index].difference && data[index].difference > 0 ? (
        <tspan>(+{data[index].difference})</tspan>
      ) : data[index].difference < 0 ? (
        <tspan>(-{data[index].difference})</tspan>
      ) : null;

    return (
      <g>
        <text
          x={textX}
          y={textY}
          fill={textColor}
          fontSize={fontSize}
          className="text-[10px] md:text-[15px]"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {data[index].value} {difference}
        </text>
        {data[index].difference > 0 ? (
          <foreignObject x={arrowX - 33} y={arrowY + 2} width="20" height="16">
            <ArrowGreenUp />
          </foreignObject>
        ) : data[index].difference < 0 ? (
          <foreignObject x={arrowX - 33} y={arrowY + 2} width="20" height="16">
            <ArrowRedDown />
          </foreignObject>
        ) : null}
      </g>
    );
  };

export default CustomPieLabelList;
