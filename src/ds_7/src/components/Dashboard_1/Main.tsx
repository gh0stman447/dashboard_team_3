import React from 'react';
import {
  ComposedChart,
  Line,
  BarChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar
} from 'recharts';
import { BAR_DATA, COLORS, SKILLS } from '../../constants/Dashboard_2';

const Main = () => {
  return (
    <div className="4xl:flex justify-between text-black p-2">
      <div className="4xl:p-4 4xl:w-1/2">
        <div className="text-[20px] 4xl:text-[32px] flex flex-col gap-2 mb-[20px]">
          <p className="">
            Представлено навыков: <span className="text-[25px] 4xl:text-[48px]">93 (+11)</span>
          </p>
          <p>
            Увеличен уровень: <span className="text-[25px] 4xl:text-[48px]">+15</span>
          </p>
        </div>
        <div className="text-center ">
          <p className="text-[18px] 4xl:text-[24px]"> Количество и прирост навыков и их типов у сотрудника</p>
          <div className="w-full h-[500px] lg:h-[800px]  lg:m-auto 4xl:w-[750px] 4xl:h-[750px] rounded-xl bg-white shadow-2xl">
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <PieChart width={600} height={600}>
                <Pie dataKey={'value'} data={SKILLS} innerRadius={0} outerRadius={'100%'}>
                  {SKILLS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full 4xl:w-1/2 mt-[50px] 4xl:p-4 4xl:mt-0">
        <div className="flex flex-col grow items-center justify-between text-center gap-4 mb-[20px] 4xl:mb-0">
          <p className="text-[23px] 4xl:text-[36px]">Языки программирования</p>
          <p className="text:[14px] 4xl:text-[24px]">
            Уровень знаний сотрудника в сравнении со средним уровнем в пределах должности
          </p>
        </div>
        <div className="w-full h-[500px] 4xl:h-[750px] 4xl:w-[750px] rounded-xl bg-white shadow-2xl">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={750}
              height={750}
              data={BAR_DATA}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" barSize={100} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Main;
