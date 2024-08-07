import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import CustomPieTooltip from '../ui/Charts/CustomPieTooltip';
import CustomPieLabelList from '../ui/Charts/CustomPieLabelList';
import { calculateDifferenceForPie } from '../../utils';
import { PageInfo } from '../../constants';
import CustomPieLegend from '../ui/Charts/CustomPieLegend';
import NoChartComponent from '../ui/NoChartComponent';
import { usePieData } from '../../hooks/Dashboard_1';
import CustomPieChart from '../ui/Charts/CustomPieChart';

const PieChartRenderContent = () => {
  const filters = useDB1FiltersStore((state) => ({
    date: state.date,
    empIdField: state.empIdField
  }));

  const { dataAllTimeDate, dataBeforeSelectedDate, dataPrevDate, isLoading, isError } = usePieData(filters);

  const statusMessage = isError
    ? 'Ошибка'
    : isLoading
    ? 'Загрузка...'
    : !filters.empIdField
    ? 'Выберите сотрудника'
    : undefined;

  if (statusMessage) {
    return <NoChartComponent label={statusMessage} />;
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
    <CustomPieChart
      data={dataWithIncrease}
      innerRadius={0}
      outerRadius={'95%'}
      label={CustomPieLabelList(dataWithIncrease, 'black', '25px')}
      legend={<CustomPieLegend data={dataWithIncrease} legendWidth={'100%'} pageInfo={PageInfo.FIRST} />}
      tooltip={<CustomPieTooltip />}
    />
  );
};

export default PieChartRenderContent;
