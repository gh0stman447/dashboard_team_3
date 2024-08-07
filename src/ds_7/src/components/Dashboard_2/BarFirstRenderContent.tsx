import React from 'react';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import NoChartComponent from '../ui/NoChartComponent';
import CustomFirstBarTooltip from '../ui/Charts/Dashboard_2/CustomFirstBarTooltip';
import { getGrowthOfEmployeesForBarChart } from '../../utils';
import { useFirstBarChartData } from '../../hooks/Dashboard_2';
import CustomBarChart from '../ui/Charts/CustomBarChart';

const BarFirstRenderContent = () => {
  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision,
    typesOfSkill: state.typesOfSkill
  }));

  const {
    departmentCountOfEmployeesBySkillsAllTimeDate,
    departmentCountOfEmployeesBySkillsBeggingSelectedDate,
    departmentCountOfEmployeesBySkillsEndSelectedDate,

    isLoading,
    isError
  } = useFirstBarChartData(filters);

  const statusMessage = isError
    ? 'Ошибка'
    : isLoading
    ? 'Загрузка...'
    : !filters.position.length && !filters.devision.length
    ? 'Выберите должность или подразделение'
    : undefined;

  if (statusMessage) {
    return <NoChartComponent label={statusMessage} className="text-center" />;
  }

  const modifiedBarData = filters.date
    ? getGrowthOfEmployeesForBarChart(
        departmentCountOfEmployeesBySkillsEndSelectedDate,
        departmentCountOfEmployeesBySkillsBeggingSelectedDate,
        'name'
      )
    : departmentCountOfEmployeesBySkillsAllTimeDate.map((skill) => ({ ...skill, growth: 0, wasNegative: false }));

  if (!modifiedBarData.length) {
    return <NoChartComponent label="Нет данных" />;
  }

  return (
    <CustomBarChart
      data={modifiedBarData}
      brushEnabled
      isHasDate={!!filters.date}
      gradientIds={{ countOfEmployees: 'colorCountOfEmployees', growth: 'colorImprovement' }}
      xAxisDataKey="name"
      yAxisLabel="Количество сотрудников"
      barDataKeys={{ countOfEmployees: 'countOfEmployees', growth: 'growth' }}
      tooltipContent={<CustomFirstBarTooltip />}
    />
  );
};

export default BarFirstRenderContent;
