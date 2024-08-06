import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import CustomPieTooltip from '../ui/Charts/CustomPieTooltip';
import CustomPieLabelList from '../ui/Charts/CustomPieLabelList';
import { usePieData } from '../hooks/Dashboard_1';
import { calculateDifferenceForPie } from '../../utils';
import { PageInfo } from '../../constants';
import CustomPieLegend from '../ui/Charts/CustomPieLegend';
import NoChartComponent from '../ui/NoChartComponent';

const PieChartRenderContent = () => {
  const filters = useDB1FiltersStore((state) => ({
    date: state.date,
    empIdField: state.empIdField
  }));

  const { dataAllTimeDate, dataBeforeSelectedDate, dataPrevDate, isLoading, isError } = usePieData(filters);

  const availableText = isError
    ? 'Ошибка'
    : isLoading
    ? 'Загрузка...'
    : !filters.empIdField
    ? 'Выберите сотрудника'
    : undefined;

  if (availableText) {
    return <NoChartComponent label={availableText} />;
  }

  // Рассчитываем разницу на конец периода и начало. Если дата не указана, то берем данные за все время, и прирост делаем равный null
  const dataWithIncrease = calculateDifferenceForPie(
    filters.date ? dataBeforeSelectedDate : dataAllTimeDate,
    dataPrevDate,
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
        <Tooltip content={<CustomPieTooltip />} />

        {/** PageInfo определяет, на какой странице отображается компонент. Тупо для того, чтобы не дублировать его */}
        <Legend content={<CustomPieLegend data={dataWithIncrease} legendWidth={'100%'} pageInfo={PageInfo.FIRST} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartRenderContent;
