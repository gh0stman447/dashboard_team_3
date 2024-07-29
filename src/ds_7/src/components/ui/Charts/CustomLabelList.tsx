import React from 'react';
import { ArrowGreenUp } from '../../../../../assets/Dashboard_1';
import { ArrowRedDown } from '../../../../../assets/Dashboard_1/ArrowRedDown';

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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Расположение цифр внутри сектора
    const textX = cx + (radius - 20) * Math.cos(-midAngle * RADIAN);
    const textY = cy + (radius - 20) * Math.sin(-midAngle * RADIAN);

    // Расположение стрелочек
    const arrowOffset = 30; // Отступ между числом и стрелочками
    const arrowX = textX - arrowOffset;

    // Вычисление Y для стрелочек с учетом отступа
    const arrowY = textY - (fontSize ? parseFloat(fontSize) / 2 : 10);

    const difference =
      data[index].difference && data[index].difference > 0 ? (
        <tspan>+({data[index].difference})</tspan>
      ) : data[index].difference < 0 ? (
        <tspan>-({data[index].difference})</tspan>
      ) : null;

    return (
      <g>
        {/* Цифры внутри сектора */}
        <text x={textX} y={textY} fill={textColor} fontSize={fontSize} textAnchor="middle" dominantBaseline="central">
          {data[index].value} {difference}
        </text>
        {/* Стрелочки */}
        {data[index].difference > 0 ? (
          <foreignObject x={arrowX - 30} y={arrowY} width="25" height="25">
            <div style={{ width: '20px', height: '20px' }}>
              <ArrowGreenUp />
            </div>
          </foreignObject>
        ) : data[index].difference < 0 ? (
          <foreignObject x={arrowX - 30} y={arrowY} width="25" height="25">
            <div style={{ width: '20px', height: '20px' }}>
              <ArrowRedDown />
            </div>
          </foreignObject>
        ) : null}
      </g>
    );
  };

export default customLabelList;
