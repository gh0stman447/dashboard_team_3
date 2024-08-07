import React, { ReactElement } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  Brush
} from 'recharts';
import { renderLinearGradient } from '../../../utils/renderGradient';

interface CustomBarChartProps {
  data: any[];
  height?: number;
  width?: number;
  margin?: { top: number; right: number; left: number; bottom: number };
  gradientIds?: { firstKey: string; secondKey: string };
  barDataKeys?: { firstKey: string; secondKey: string };
  isHasDate?: boolean;
  tooltipContent: ReactElement;
  yAxisLabel?: string;
  xAxisDataKey?: string;
  yAxisTickFormatter?: (value: any) => string;
  brushEnabled?: boolean;
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data,
  height = 300,
  width = 500,
  margin = { top: 15, right: 19, left: 15, bottom: 20 },
  gradientIds = { firstKey: 'colorCountOfEmployees', secondKey: 'colorImprovement' },
  barDataKeys = { firstKey: 'countOfEmployees', secondKey: 'growth' },
  isHasDate = false,
  tooltipContent,
  yAxisLabel = 'Количество сотрудников',
  xAxisDataKey = 'name',
  yAxisTickFormatter,
  brushEnabled = false
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={width} height={height} data={data} margin={margin}>
        <defs>
          {renderLinearGradient({
            id: gradientIds.firstKey,
            colors: [
              { offset: '5%', stopColor: '#934983', stopOpacity: 0.8 },
              { offset: '95%', stopColor: '#934983', stopOpacity: 0.2 }
            ]
          })}
          {renderLinearGradient({
            id: gradientIds.secondKey,
            colors: [
              { offset: '5%', stopColor: '#00ff00', stopOpacity: 0.8 },
              { offset: '95%', stopColor: '#00ff00', stopOpacity: 0.2 }
            ]
          })}
        </defs>
        {brushEnabled && data.length > 3 && (
          <Brush dataKey={xAxisDataKey} startIndex={0} endIndex={5} travellerWidth={5} height={30} stroke="#8884d8" />
        )}
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          label={{
            value: yAxisLabel,
            angle: -90,
            position: 'inside',
            fontSize: 16,
            dy: 20,
            dx: -25,
            fill: 'black'
          }}
        />
        <XAxis dataKey={xAxisDataKey} tickFormatter={yAxisTickFormatter} />
        <Tooltip content={tooltipContent} />
        <Bar
          dataKey={barDataKeys.firstKey}
          stackId="1"
          fill={`url(#${gradientIds.firstKey})`}
          label={({ x, y, width, height, value }) => (
            <text
              x={x + width / 2}
              y={y + height / 2}
              dy={5}
              textAnchor="middle"
              fill="#000"
              fontSize={14}
              fontWeight="bold"
            >
              {value !== 0 && value}
            </text>
          )}
        />
        {isHasDate && (
          <Bar dataKey={barDataKeys.secondKey} stackId="1" fill={`url(#${gradientIds.secondKey})`}>
            {data.map((_, index) => (
              <React.Fragment key={index}>
                <Cell fill={'#82ca9d'} />
                <LabelList
                  dataKey={barDataKeys.secondKey}
                  position={'insideTop'}
                  fill={'#000'}
                  content={({ x, y, value, width }) => {
                    const numericValue = Number(value);
                    return (
                      <text x={x + width / 2} y={y + 15} textAnchor="middle" fill="#000" fontSize={13}>
                        {numericValue !== 0 && `+${numericValue}`}
                      </text>
                    );
                  }}
                />
              </React.Fragment>
            ))}
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
