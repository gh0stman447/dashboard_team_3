import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { calculateDifferenceForPie } from '../../utils/calculateDifferenceForPie';
import CustomTooltip from '../ui/Charts/CustomTooltip';
import CustomPieLegend from './CustomPieLegend';
import CustomPieLabelList from '../ui/Charts/CustomPieLabelList';
import { usePieData } from '../hooks/Dashboard_1';

const PieChartRenderContent = () => {
  const filters = useDB1FiltersStore((state) => ({
    date: state.date,
    empIdField: state.empIdField
  }));

  const {
    dataAllTimeDate,
    dataBeforeSelectedDate,
    dataPrevDate,
    isLoadingDataBeforeSelectedDate,
    isLoadingDataAllTimeDate,
    isLoadingDataPrevDate,
    isErrorDataBeforeSelectedDate,
    isErrorDataAllTimeDate,
    isErrorDataPrevDate
  } = usePieData(filters);

  if (isLoadingDataBeforeSelectedDate || isLoadingDataAllTimeDate || isLoadingDataPrevDate) {
    return <div>Загрузка...</div>;
  }
  if (isErrorDataAllTimeDate || isErrorDataBeforeSelectedDate || isErrorDataPrevDate) {
    return <div>Ошибка</div>;
  }

  if (!filters.empIdField) {
    return <span className="4xl:h-[700px] flex items-center justify-center">Выберите сотрудника</span>;
  }

  const dataWithIncrease = calculateDifferenceForPie(
    filters.date ? dataBeforeSelectedDate : dataAllTimeDate,
    dataPrevDate,
    !!filters.date
  );

  if (!dataWithIncrease || dataWithIncrease.length === 0) {
    return <span className="4xl:h-[700px] flex items-center justify-center">Данных нет</span>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey={'value'}
          data={dataWithIncrease}
          innerRadius={0}
          outerRadius={'95%'}
          label={CustomPieLabelList(dataWithIncrease, 'black', '25px')}
          labelLine={false}
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease-out"
        >
          {dataWithIncrease.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomPieLegend data={dataWithIncrease} legendWidth={'100%'} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartRenderContent;
