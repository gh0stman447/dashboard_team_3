import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { ArrowGreenUp } from '../../../../assets/Dashboard_1';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/Data.service';
import { transformFiltersFromDB1 } from '../../utils/transformFilters';
import { difference } from 'react-query/types/core/utils';
import { calculateDifferenceForPie } from '../../utils/calculateDifferenceForPie';
import CustomTooltip from '../ui/Charts/CustomTooltip';
import CustomPieLegend from './CustomPieLegend';
import CustomPieLabelList from '../ui/Charts/CustomPieLabelList';

const PieChartRenderContent = () => {
  const filters = useDB1FiltersStore((state) => ({
    // typesOfSkill: state.typesOfSkill,
    date: state.date,
    empIdField: state.empIdField
  }));

  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: dataAllTimeDate,
    isLoading: isLoadingDataAllTimeDate,
    isError: isErrorDataAllTimeDate
  } = useQuery(
    ['PieDataAllTimeDate', filters.date, filters.empIdField],
    () => dataService.fetchPieData(transformedFilters, 'PieDataAllTimeDate'),
    {
      enabled: !!filters?.empIdField && (!filters?.date || !filters?.date.length),

      refetchOnWindowFocus: false
    }
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
      enabled: !!filters?.date && !!filters?.empIdField,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: dataPrevDate,
    isLoading: isLoadingDataPrevDate,
    isError: isErrorDataPrevDate
  } = useQuery(
    ['pieDataPrevDate', filters.date, filters.empIdField],
    () =>
      dataService.fetchPieData(
        { ...transformedFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'PieDataPrevDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField,
      refetchOnWindowFocus: false
    }
  );

  if (isLoadingDataBeforeSelectedDate || isLoadingDataAllTimeDate || isLoadingDataPrevDate) {
    return <div>Loading...</div>;
  }
  if (isErrorDataAllTimeDate || isErrorDataBeforeSelectedDate || isErrorDataPrevDate) {
    return <div>Error</div>;
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
