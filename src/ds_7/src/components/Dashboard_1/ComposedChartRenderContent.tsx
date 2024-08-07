import React from 'react';
import useDB1FiltersStore from '../../store/DB1FiltersStore';

import NoChartComponent from '../ui/NoChartComponent';
import CustomBarTooltip from '../ui/Charts/Dashboard_1/CustomBarTooltip';
import { LEVEL_NAMES } from '../../constants';
import { calculateImprovementForBarChart } from '../../utils';
import { useComposedChartData } from '../../hooks/Dashboard_1';
import { IBarChartAllPeopleData } from '../../models';
import CustomComposedBarData from '../ui/Charts/CustomComposedBarData';

const ComposedChartRenderContent = () => {
  const filters = useDB1FiltersStore((state) => ({
    date: state.date,
    empIdField: state.empIdField,
    typesOfSkill: state.typesOfSkill
  }));

  const {
    allPeopleAllTimeDate,
    allPeopleEndSelectedDate,

    employeeAllTimeData,
    employeeBeginningSelectedDate,
    employeeEndSelectedDate,

    isLoading,
    isError
  } = useComposedChartData(filters);

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

  const yAxisTickFormatter = (value: string) => {
    return LEVEL_NAMES[value] || ''; //Отображаем исключительно стринговые значения из объекта
  };

  // Вычисляем средний уровень по департаменту среди сотрудников по соответствующим навыкам
  const getAverageLevel = (skillName: string, allPeopleData: IBarChartAllPeopleData[]) => {
    const skill = allPeopleData.find((s) => s.name === skillName);
    return skill ? skill.level_num : 0;
  };

  const peopleData = filters.date ? allPeopleEndSelectedDate : allPeopleAllTimeDate;

  const barData = filters.date
    ? calculateImprovementForBarChart(employeeEndSelectedDate, employeeBeginningSelectedDate)
    : employeeAllTimeData.map((skill) => ({
        name: skill.name,
        empLvl: skill.level_num,
        improvement: 0
      }));

  const modifiedBarData = barData.map((skill) => ({
    ...skill,
    empLvl: skill.empLvl,
    middleLvl: getAverageLevel(skill.name, peopleData)
  }));

  if (!modifiedBarData || modifiedBarData.length === 0) {
    return <NoChartComponent label="Нет данных" />;
  }

  return (
    <CustomComposedBarData
      data={modifiedBarData}
      brushEnabled
      tooltipContent={<CustomBarTooltip />}
      yAxisTickFormatter={yAxisTickFormatter}
    />
  );
};

export default ComposedChartRenderContent;
