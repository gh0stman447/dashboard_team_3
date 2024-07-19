import React from 'react';
import {
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Brush
} from 'recharts';
import { Download } from '../../../../assets';
import { downloadPng, recalculateImprovement } from '../../utils';
import { BAR_DATA } from '../../constants/Dashboard_2';

const LEVEL_NAMES = {
  0: 'ИНП',
  1: 'Novice',
  2: 'Junior',
  3: 'Middle',
  4: 'Senior',
  5: 'Expert'
};

const ComposedChartBlock = () => {
  const composedBarRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  const yAxisTickFormatter = (value: string) => {
    return LEVEL_NAMES[value] || value;
  };

  const modifiedBarData = recalculateImprovement(BAR_DATA);
  return (
    <div
      className="flex flex-col items-center justify-between w-full 4xl:col-span-1 4xl:row-span-3 bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50"
      ref={composedBarRef}
    >
      <div className="w-full p-2">
        <div className="flex flex-col items-center text-center">
          <p className="text-[23px] 2xl:text-[36px]">Языки программирования</p>
          <p className="text-[14px] 2xl:text-[24px]">
            Уровень знаний сотрудника в сравнении со средним уровнем в пределах должности
          </p>
        </div>
      </div>
      <div className="w-full h-[400px] md:h-[700px] lg:w-full lg:h-[800px] flex flex-col items-center justify-center divide-y-2 divide-gray/50">
        <div className="relative w-full h-full xl:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={modifiedBarData}
              margin={{
                top: 20,
                right: 25,
                bottom: 20,
                left: 10
              }}
              // className="2xl:border border-black"
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
          <div className="absolute bottom-[10px] left-[10px]">
            <Download
              ref={downloadButtonRef}
              onClick={() => downloadPng(downloadButtonRef, composedBarRef)}
              className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[30px] 4xl:h-[30px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposedChartBlock;
