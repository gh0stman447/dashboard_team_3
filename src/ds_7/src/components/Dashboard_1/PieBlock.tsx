import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Download } from '../../../../assets';
import { COLORS, SKILLS } from '../../constants/Dashboard_2';
import { downloadPng } from '../../utils';

const customLabelList = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
      <tspan x={x} dy="-0.5em">
        {SKILLS[index].name}
      </tspan>
      <tspan x={x} dy="1.2em">
        ({SKILLS[index].value})
      </tspan>
    </text>
  );
};
const PieBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const pieChartRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="text-center w-full h-[500px] lg:h-[700px] lg:m-auto 4xl:w-full 4xl:h-full 4xl:col-span-1 4xl:row-span-2 rounded-xl bg-white shadow-2xl flex flex-col items-center justify-center divide-y-2 divide-gray/50"
      ref={pieChartRef}
    >
      <div className="w-full p-2">
        <p className="text-[18px] 2xl:text-[24px]">Количество и прирост навыков и их типов у сотрудника</p>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey={'value'}
              data={SKILLS}
              innerRadius={0}
              outerRadius={'95%'}
              label={customLabelList}
              labelLine={false}
            >
              {SKILLS.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-[6px] left-[6px] md-lg:top-5 md-lg:left-5">
          <Download
            ref={downloadButtonRef}
            onClick={() => downloadPng(downloadButtonRef, pieChartRef)}
            className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[30px] 4xl:h-[30px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PieBlock;
