import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { ArrowGreenUp } from '../../../../assets/Dashboard_1';

const PieChartRenderContent = ({
  data,
  empIdField
}: {
  data: { name: string; value: number; color: string; difference: number | null }[];
  empIdField: string;
}) => {
  const customLabelList =
    (data: { name: string; value: number; color: string; difference: number | null }[]) =>
    ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <g>
          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
            <tspan x={x} dy="-0.5em">
              {data[index].name}
            </tspan>
            <tspan x={x} dy="1.2em">
              ({data[index].value}) {data[index].difference > 0 && <tspan>+ ({data[index].difference})</tspan>}
            </tspan>
          </text>
          {data[index].difference > 0 && (
            <foreignObject x={x - 60} y={y} width={25} height={20}>
              <ArrowGreenUp />
            </foreignObject>
          )}
        </g>
      );
    };

  if (!empIdField) {
    return <span className="4xl:h-[700px] flex items-center justify-center">Выберите сотрудника</span>;
  }

  if (!data || data.length === 0) {
    return <span className="4xl:h-[700px] flex items-center justify-center">Данных нет</span>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey={'value'}
          data={data}
          innerRadius={0}
          outerRadius={'95%'}
          label={customLabelList(data)}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="text-xs bg-navy rounded-xl py-4 px-5 text-white text-[30px]">{`${payload[0].name}: ${payload[0].value}`}</div>
              );
            }
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartRenderContent;
