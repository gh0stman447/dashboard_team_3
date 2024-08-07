import React from 'react';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import NoChartComponent from '../ui/NoChartComponent';
import CustomSecondBarTooltip from '../ui/Charts/Dashboard_2/CustomSecondBarTooltip';
import { LEVEL_NAMES } from '../../constants';
import { getGrowthOfEmployeesForBarChart, getHighestLevelDataForBarChart } from '../../utils';
import { useSecondBarChartData } from '../../hooks/Dashboard_2';
import CustomBarChart from '../ui/Charts/CustomBarChart';

const BarSecondRenderContent = () => {
  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision,
    typesOfSkill: state.typesOfSkill,
    skills: state.skills
  }));

  const {
    countOfEmployeesBySkillLevelAllTimeDate,
    countOfEmployeesBySkillLevelBeggingSelectedDate,
    countOfEmployeesBySkillLevelEndSelectedDate,

    isLoading,
    isError
  } = useSecondBarChartData(filters);

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

  const yAxisTickFormatter = (value: string) => {
    return LEVEL_NAMES[value] || value;
  };

  const allTimeData = !filters.date && getHighestLevelDataForBarChart(countOfEmployeesBySkillLevelAllTimeDate);
  const begginData = filters.date && getHighestLevelDataForBarChart(countOfEmployeesBySkillLevelBeggingSelectedDate);
  const endData = filters.date && getHighestLevelDataForBarChart(countOfEmployeesBySkillLevelEndSelectedDate);

  const modifiedBarData = filters.date
    ? getGrowthOfEmployeesForBarChart(endData, begginData, 'level_num')
    : allTimeData.map((skill) => ({ ...skill, growth: 0, wasNegative: false }));

  if (!modifiedBarData.length) {
    return <NoChartComponent label="Нет данных" />;
  }

  return (
    <CustomBarChart
      data={modifiedBarData}
      tooltipContent={<CustomSecondBarTooltip />}
      xAxisDataKey="level_num"
      yAxisLabel="Количество сотрудников"
      yAxisTickFormatter={yAxisTickFormatter}
      isHasDate={!!filters.date}
    />
  );
};

export default BarSecondRenderContent;
