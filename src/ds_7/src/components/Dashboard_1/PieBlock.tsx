import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Download } from '../../../../assets';
import { downloadPng } from '../../utils';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { useQuery } from 'react-query';

import { dataService } from '../../services/Data.service';
import { transformFiltersFromDB1 } from '../../utils/transformFilters';

const customLabelList =
  (data) =>
  ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
        <tspan x={x} dy="-0.5em">
          {data[index].name}
        </tspan>
        <tspan x={x} dy="1.2em">
          ({data[index].value})
        </tspan>
      </text>
    );
  };

const PieBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const pieChartRef = React.useRef<HTMLDivElement | null>(null);

  const filters = useDB1FiltersStore((state) => ({
    typeOfSkill: state.typeOfSkill,
    date: state.date,
    empIdField: state.empIdField
  }));

  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: dataBetweenDate,
    isLoading: isLoadingDataBetweenDate,
    isError: isErrorDataBetweenDate
  } = useQuery(['pieDataBetweenDate', filters.date, filters.empIdField], () =>
    dataService.fetchPieData(transformedFilters, 'PieDataBetweenDate')
  );

  const {
    data: dataBeforeSelectedDate,
    isLoading: isLoadingDataBeforeSelectedDate,
    isError: isErrorDataBeforeSelectedDate
  } = useQuery(
    ['pieDataBeforeSelectedDate', filters.date, filters.empIdField],
    () =>
      dataService.fetchPieData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'PieDataBeforeSelectedDate'
      ),
    {
      enabled: !!filters?.date
    }
  );

  if (isLoadingDataBeforeSelectedDate || isLoadingDataBetweenDate) {
    return <div>Loading...</div>;
  }
  if (isErrorDataBetweenDate || isErrorDataBeforeSelectedDate) {
    return <div>Error</div>;
  }

  const data = !filters.date ? dataBetweenDate : dataBeforeSelectedDate;
  console.log(data, 'data');

  return (
    <div
      className="text-center w-full h-[500px] lg:h-[700px] lg:m-auto 4xl:w-full 4xl:h-full 4xl:col-span-1 4xl:row-span-2 rounded-xl bg-white border border-black shadow-2xl flex flex-col items-center justify-center divide-y-2 divide-gray/50"
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
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="text-xs bg-navy rounded-xl py-4 px-5 text-white text-[30px]">{`${payload[0].name}: ${payload[0].value}`}</div>
                  );
                }
              }}
            />
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
