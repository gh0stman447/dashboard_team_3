import React from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { calculateDifferenceForPie } from '../../utils/calculateDifferenceForPie';
import CustomTooltip from '../ui/Charts/CustomTooltip';
import CustomPieLabelList from '../ui/Charts/CustomPieLabelList';
import CustomPieLegend from './CustomPieLegend';
import { usePieData } from '../hooks/Dashboard_2';

const PieChartRenderContent = () => {
  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision
  }));

  const {
    departmentDataAllTimeDate,
    departmentDataBegginingSelectedDate,
    departmentDataEndSelectedDate,
    isErrorDepartmentAllTimeDate,
    isErrorDepartmentDataBegginingSelectedDate,
    isErrorDepartmentDataEndSelectedDate,
    isLoadingDepartmentAllTimeDate,
    isLoadingDepartmentDataBegginingSelectedDate,
    isLoadingDepartmentDataEndSelectedDate
  } = usePieData(filters);

  if (
    isLoadingDepartmentAllTimeDate ||
    isLoadingDepartmentDataBegginingSelectedDate ||
    isLoadingDepartmentDataEndSelectedDate
  ) {
    return <div>Загрузка...</div>;
  }

  if (
    isErrorDepartmentAllTimeDate ||
    isErrorDepartmentDataBegginingSelectedDate ||
    isErrorDepartmentDataEndSelectedDate
  ) {
    return <div>Ошибка</div>;
  }

  const dataWithIncrease = calculateDifferenceForPie(
    !filters.date ? departmentDataAllTimeDate : departmentDataEndSelectedDate,
    departmentDataBegginingSelectedDate,
    !!filters.date
  );

  if (!dataWithIncrease || dataWithIncrease.length === 0) {
    return <span className="flex items-center justify-center">Данных нет</span>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey={'value'}
          data={dataWithIncrease}
          innerRadius={0}
          outerRadius={'95%'}
          label={CustomPieLabelList(dataWithIncrease, 'black', '20px')}
          labelLine={false}
        >
          {dataWithIncrease.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label />
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomPieLegend data={dataWithIncrease} legendWidth={'100%'} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartRenderContent;
