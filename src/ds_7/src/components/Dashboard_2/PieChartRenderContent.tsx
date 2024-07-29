import React from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer, Tooltip } from 'recharts';
import { useQuery } from 'react-query';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { dataService } from '../../services/DataDboard2.service';
import { calculateDifferenceForPie } from '../../utils/calculateDifferenceForPie';
import { transformFiltersFromDB2 } from '../../utils';
import customLabelList from '../ui/CustomLabelList';

const PieChartRenderContent = () => {
  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision
  }));

  const transformedFilters = transformFiltersFromDB2(filters);

  const queryFilters =
    filters.position.length === 0 && filters.devision.length === 0
      ? { ...transformedFilters }
      : filters.position.length === 0 && filters.devision.length > 0
      ? { ...transformedFilters, is_depart_key_skill_type: ['=', true] }
      : filters.devision.length === 0 && filters.position.length > 0
      ? { ...transformedFilters, is_job_key_skill_type: ['=', true] }
      : { ...transformedFilters, is_job_key_skill_type: ['=', true] };

  const {
    data: departmentDataAllTimeDate,
    isLoading: isLoadingDepartmentAllTimeDate,
    isError: isErrorDepartmentAllTimeDate
  } = useQuery(['departmentPieDataAllTimeDate', filters], () =>
    dataService.fetchPieDepartmentData({ ...queryFilters, date: undefined }, 'departmentPieDataAllTimeDate')
  );

  const {
    data: departmentDataBegginingSelectedDate,
    isLoading: isLoadingDepartmentDataBegginingSelectedDate,
    isError: isErrorDepartmentDataBegginingSelectedDate
  } = useQuery(
    ['departmentPieDataBegginingSelectedDate', filters],
    () =>
      dataService.fetchPieDepartmentData(
        { ...queryFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'departmentPieDataBegginingSelectedDate'
      ),
    {
      enabled: !!filters?.date
    }
  );

  const {
    data: departmentDataEndSelectedDate,
    isLoading: isLoadingDepartmentDataEndSelectedDate,
    isError: isErrorDepartmentDataEndSelectedDate
  } = useQuery(
    ['departmentPieDataEndSelectedDate', filters],
    () =>
      dataService.fetchPieDepartmentData(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'departmentPieDataEndSelectedDate'
      ),
    {
      enabled: !!filters?.date
    }
  );

  if (
    isLoadingDepartmentAllTimeDate ||
    isLoadingDepartmentDataBegginingSelectedDate ||
    isLoadingDepartmentDataEndSelectedDate
  ) {
    return <div>Loading...</div>;
  }

  if (
    isErrorDepartmentAllTimeDate ||
    isErrorDepartmentDataBegginingSelectedDate ||
    isErrorDepartmentDataEndSelectedDate
  ) {
    return <div>Error</div>;
  }

  const dataWithIncrease = calculateDifferenceForPie(
    !filters.date ? departmentDataAllTimeDate : departmentDataBegginingSelectedDate,
    departmentDataEndSelectedDate,
    !!filters.date
  );

  if (!dataWithIncrease || dataWithIncrease.length === 0) {
    return <span className=" flex items-center justify-center">Данных нет</span>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey={'value'}
          data={dataWithIncrease}
          innerRadius={0}
          outerRadius={'95%'}
          label={customLabelList(dataWithIncrease, 'black', '20px')}
          labelLine={false}
        >
          {dataWithIncrease.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartRenderContent;
