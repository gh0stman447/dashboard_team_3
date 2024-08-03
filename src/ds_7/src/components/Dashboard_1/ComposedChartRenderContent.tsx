import React from 'react';
import { ComposedChart, Line, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Bar, Brush } from 'recharts';
import useDB1FiltersStore from '../../store/DB1FiltersStore';

import NoChartComponent from '../ui/NoChartComponent';
import CustomBarTooltip from '../ui/Dashboard_1/CustomBarTooltip';
import { LEVEL_NAMES } from '../../constants/Dashboard_2';
import { useComposedChartData } from '../hooks/Dashboard_1';

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

    isErrorAllPeopleAllTimeDate,
    isErrorAllPeopleEndSelectedDate,

    isErrorEmployeeAllTimeData,
    isErrorEmployeeBeginningSelectedDate,
    isErrorEmployeeEndSelectedDate,

    isLoadingAllPeopleAllTimeDate,
    isLoadingAllPeopleEndSelectedDate,

    isLoadingEmployeeAllTimeData,
    isLoadingEmployeeBeginningSelectedDate,
    isLoadingEmployeeEndSelectedDate,

    position
  } = useComposedChartData(filters);

  if (
    isLoadingAllPeopleAllTimeDate ||
    isLoadingAllPeopleEndSelectedDate ||
    isLoadingEmployeeBeginningSelectedDate ||
    isLoadingEmployeeEndSelectedDate ||
    isLoadingEmployeeAllTimeData
  ) {
    return <NoChartComponent label="Загрузка..." />;
  }

  if (
    isErrorAllPeopleAllTimeDate ||
    isErrorAllPeopleEndSelectedDate ||
    isErrorEmployeeBeginningSelectedDate ||
    isErrorEmployeeEndSelectedDate ||
    isErrorEmployeeAllTimeData
  ) {
    return <NoChartComponent label="Ошибка" />;
  }

  if (!filters.empIdField || !position) {
    return <NoChartComponent label="Выберите сотрудника" />;
  }

  const yAxisTickFormatter = (value: string) => {
    return LEVEL_NAMES[value] || '';
  };

  const getImprovement = (
    endData: {
      name: string;
      level_num: number;
      job_title: string;
    }[],
    beginData: {
      name: string;
      level_num: number;
      job_title: string;
    }[]
  ) => {
    return endData.map((endSkill) => {
      const beginSkill = beginData.find((skill) => skill.name === endSkill.name);
      const improvement = beginSkill ? endSkill.level_num - beginSkill.level_num : endSkill.level_num;
      return {
        name: endSkill.name,
        empLvl: beginSkill ? beginSkill.level_num : 0,
        improvement
      };
    });
  };

  const getAverageLevel = (skillName: string, allPeopleData: { name: string; level_num: number }[]) => {
    const skill = allPeopleData.find((s) => s.name === skillName);
    return skill ? skill.level_num : 0;
  };

  const peopleData = filters.date ? allPeopleEndSelectedDate : allPeopleAllTimeDate;

  const BAR_DATA = filters.date
    ? getImprovement(employeeEndSelectedDate, employeeBeginningSelectedDate)
    : employeeAllTimeData.map((skill) => ({
        name: skill.name,
        empLvl: skill.level_num,
        improvement: 0
      }));

  const modifiedBarData = BAR_DATA.map((skill) => ({
    ...skill,
    empLvl: skill.empLvl,
    middleLvl: getAverageLevel(skill.name, peopleData)
  }));

  if (!modifiedBarData || modifiedBarData.length === 0) {
    return <NoChartComponent label="Нет данных" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={modifiedBarData} margin={{ top: 20, right: 25, bottom: 20, left: 10 }}>
        <defs>
          <linearGradient id="colorEmpLvl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#934983" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#934983" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorImprovement" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00ff00" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorMiddleLvl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor="#0000ff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0000ff" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Brush dataKey="name" startIndex={0} endIndex={6} travellerWidth={20} height={30} stroke="#8884d8" />
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis tickFormatter={yAxisTickFormatter} tickCount={6} ticks={Object.keys(LEVEL_NAMES)} />
        <Tooltip content={<CustomBarTooltip />} />
        <Bar
          dataKey="empLvl"
          stackId={1}
          barSize={100}
          fill="url(#colorEmpLvl)"
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease"
        />
        <Bar
          dataKey="improvement"
          stackId={1}
          barSize={100}
          fill="url(#colorImprovement)"
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease"
        />
        <Line
          type="linear"
          dataKey="middleLvl"
          stroke="url(#colorMiddleLvl)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={2600}
          animationEasing="ease"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChartRenderContent;
