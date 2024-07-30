import React from 'react';
import { ArrowGreenUp } from '../../../../../assets/Dashboard_1';
import { ArrowRedDown } from '../../../../../assets/Dashboard_1/ArrowRedDown';

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

    // Расположение цифр внутри сектора
    const textX = cx + (radius - 20) * Math.cos(-midAngle * RADIAN);
    const textY = cy + (radius - 20) * Math.sin(-midAngle * RADIAN);

    // Вычисляем длину текста, чтобы скорректировать позицию стрелочек
    const valueText = data[index].value.toString();
    const differenceText = data[index].difference !== null ? `(${data[index].difference})` : '';
    const textLength = valueText.length + differenceText.length;
    const arrowOffset = 20 + textLength * 1.5; // Дополнительное смещение для длинных чисел

    // Позиция стрелочек
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
          <foreignObject x={arrowX - 40} y={arrowY - 2} width="25" height="25">
            <div style={{ width: '20px', height: '20px' }}>
              <ArrowGreenUp />
            </div>
          </foreignObject>
        ) : data[index].difference < 0 ? (
          <foreignObject x={arrowX - 40} y={arrowY - 2} width="25" height="25">
            <div style={{ width: '20px', height: '20px' }}>
              <ArrowRedDown />
            </div>
          </foreignObject>
        ) : null}
      </g>
    );
  };

export default CustomPieLabelList;
