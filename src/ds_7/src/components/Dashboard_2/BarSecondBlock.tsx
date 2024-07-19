import React from 'react';
import { ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar, BarChart } from 'recharts';
import { downloadPng, recalculateImprovement } from '../../utils';
import { BAR_DATA } from '../../constants/Dashboard_2';
import { Download } from '../../../../assets';

const modifiedBarData = recalculateImprovement(BAR_DATA);

const BarSecondBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const barChartRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full 2xl:w-1/2 border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50">
      <div className="relative w-full h-[400px] 2xl:h-[800px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={modifiedBarData}
            margin={{
              top: 40,
              right: 50,
              left: 30,
              bottom: 15
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              label={{
                value: 'Количество сотрудников',
                angle: -90,
                position: 'inside',
                fontSize: 20
                //   dy: 20,
                //   dx: 0,
                //   rotate: 0,
                //   textAnchor: 'end',
                //   fill: 'black'
                //   stroke: 'black'
                //   strokeWidth: 1
                //   paintOrder: 'stroke'
              }}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="empLvl" stackId="1" fill="#8884d8" />
            <Bar dataKey="improvement" stackId="1" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <div className="absolute bottom-[10px] left-[10px]">
          <Download
            className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[30px] 4xl:h-[30px]"
            ref={downloadButtonRef}
            onClick={() => downloadPng(downloadButtonRef, barChartRef)}
          />
        </div>
      </div>
    </div>
  );
};

export default BarSecondBlock;
