import React from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import CustomPieTooltip from '../ui/Charts/CustomPieTooltip';
import CustomPieLabelList from '../ui/Charts/CustomPieLabelList';
import { usePieData } from '../hooks/Dashboard_2';
import { calculateDifferenceForPie } from '../../utils';
import NoChartComponent from '../ui/NoChartComponent';
import CustomPieLegend from '../ui/Charts/CustomPieLegend';
import { PageInfo } from '../../constants';

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
    isLoading,
    isError
  } = usePieData(filters);

  const statusMessage = isError ? 'Ошибка' : isLoading ? 'Загрузка...' : undefined;

  if (statusMessage) {
    return <NoChartComponent label={statusMessage} />;
  }

  const dataWithIncrease = calculateDifferenceForPie(
    !filters.date ? departmentDataAllTimeDate : departmentDataEndSelectedDate,
    departmentDataBegginingSelectedDate,
    !!filters.date
  );

  if (!dataWithIncrease || dataWithIncrease.length === 0) {
    return <NoChartComponent label="Нет данных" />;
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
        <Tooltip content={<CustomPieTooltip />} />

        {/* PageInfo для определения того, на какой странице мы отображаем компонент */}
        <Legend content={<CustomPieLegend data={dataWithIncrease} legendWidth={'100%'} pageInfo={PageInfo.SECOND} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartRenderContent;
