import React from 'react';
import {
  ComposedChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Label,
  Brush
} from 'recharts';
import { BAR_DATA, COLORS, LEVEL, SKILLS } from '../../constants/Dashboard_2';
import { recalculateImprovement } from '../../utils';
import { ArrowGreenUp, ArrowUp } from '../../../../assets/Dashboard_1';

const LEVEL_NAMES = {
  0: 'ИНП',
  1: 'Novice',
  2: 'Junior',
  3: 'Middle',
  4: 'Senior',
  5: 'Expert'
};

const yAxisTickFormatter = (value: string) => {
  return LEVEL_NAMES[value] || value;
};

const modifiedBarData = recalculateImprovement(BAR_DATA);

const Main = () => {
  return (
    <div className="grid grid-cols-1 4xl:grid-cols-2 4xl:grid-row-3 gap-y-4 4xl:gap-[37px] p-2 justify-between text-black xl:p-8  bg-sky-blue 4xl:max-h-[900px] 4xl:h-full">
      <div className="flex flex-col p-4 text-[20px] 4xl:text-[32px] rounded-xl bg-white shadow-2xl 4xl:col-span-1 4xl:row-span-1">
        <p className="flex gap-x-4 items-center">
          <p>Представлено навыков:</p>
          <span className="text-[25px] 4xl:text-[48px] flex gap-x-2 items-center">
            <ArrowGreenUp />
            <span>93 (+11)</span>
          </span>
        </p>
        <p className="flex items-center gap-x-4">
          Увеличен уровень:{' '}
          <span className="text-[25px] 4xl:text-[48px] flex gap-x-2 items-center">
            <ArrowGreenUp />
            +15
          </span>
        </p>
      </div>
      <div className="bg-white shadow-2xl flex flex-col items-center justify-between w-full 4xl:col-span-1 4xl:row-span-3 rounded-xl divide-y-2 divide-gray/50">
        <div className="flex flex-col items-center text-center 4xl:text-left 4xl:items-start p-4">
          <p className="text-[23px] 2xl:text-[36px]">Языки программирования</p>
          <p className="text-[14px] 2xl:text-[24px]">
            Уровень знаний сотрудника в сравнении со средним уровнем в пределах должности
          </p>
        </div>
        <div className="w-full h-[400px] md:h-[700px] lg:w-full lg:h-[800px] 4xl:h-[650px] flex flex-col items-center justify-center divide-y-2 divide-gray/50">
          <div className="w-full h-full xl:p-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={modifiedBarData}
                margin={{
                  top: 40,
                  right: 40,
                  bottom: 20,
                  left: 20
                }}
                className="2xl:border border-black"
              >
                <Brush startIndex={0} endIndex={modifiedBarData.length - 1} travellerWidth={10} />
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" />
                <YAxis tickFormatter={yAxisTickFormatter} tickCount={6} />
                <Tooltip />
                <Legend />
                <Bar dataKey="empLvl" stackId={1} barSize={100} fill="#934983" />
                <Bar dataKey="improvement" stackId={1} barSize={100} fill="#00ff00" />
                <Line type="linear" dataKey="middleLvl" stroke="#0000ff" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="text-center w-full h-[500px] lg:h-[700px] lg:m-auto 4xl:w-full 4xl:h-[600px] 4xl:col-span-1 4xl:row-span-2 rounded-xl bg-white shadow-2xl flex flex-col items-center justify-center divide-y-2 divide-gray/50">
        <p className="text-[18px] 2xl:text-[24px] p-4">Количество и прирост навыков и их типов у сотрудника</p>
        <div className="w-full h-full flex items-center justify-center xl:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey={'value'} data={SKILLS} innerRadius={0} outerRadius={'100%'}>
                {SKILLS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Main;
