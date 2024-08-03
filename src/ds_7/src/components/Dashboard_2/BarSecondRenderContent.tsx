import React from 'react';
import { ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Bar, BarChart, Cell, LabelList } from 'recharts';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import NoChartComponent from '../ui/NoChartComponent';
import CustomSecondBarTooltip from '../ui/Dashboard_2/CustomSecondBarTooltip';
import { LEVEL_NAMES } from '../../constants/Dashboard_2';
import { useSecondBarChartData } from '../hooks/Dashboard_2';

const BarSecondRenderContent = () => {
  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision,
    typesOfSkill: state.typesOfSkill,
    skills: state.skills
  }));

  const {
    departmentCountOfEmployeesBySkillLevelAllTimeDate,
    departmentCountOfEmployeesBySkillLevelBeggingSelectedDate,
    departmentCountOfEmployeesBySkillLevelEndSelectedDate,

    isErrorDepartmentCountOfEmployeesBySkillLevelAllTimeDate,
    isErrorDepartmentCountOfEmployeesBySkillLevelBeggingSelectedDate,
    isErrorDepartmentCountOfEmployeesBySkillLevelEndSelectedDate,

    isLoadingDepartmentCountOfEmployeesBySkillLevelAllTimeDate,
    isLoadingDepartmentCountOfEmployeesBySkillLevelBeggingSelectedDate,
    isLoadingDepartmentCountOfEmployeesBySkillLevelEndSelectedDate
  } = useSecondBarChartData(filters);

  if (!filters.position.length && !filters.devision.length) {
    return <NoChartComponent label="Выберите должность или подразделение" />;
  }

  if (
    isLoadingDepartmentCountOfEmployeesBySkillLevelAllTimeDate ||
    isLoadingDepartmentCountOfEmployeesBySkillLevelBeggingSelectedDate ||
    isLoadingDepartmentCountOfEmployeesBySkillLevelEndSelectedDate
  ) {
    return <NoChartComponent label="Загрузка..." />;
  }

  if (
    isErrorDepartmentCountOfEmployeesBySkillLevelAllTimeDate ||
    isErrorDepartmentCountOfEmployeesBySkillLevelBeggingSelectedDate ||
    isErrorDepartmentCountOfEmployeesBySkillLevelEndSelectedDate
  ) {
    return <NoChartComponent label="Ошибка" />;
  }

  const yAxisTickFormatter = (value: string) => {
    return LEVEL_NAMES[value] || value;
  };

  interface EmployeesBySkillLevelData {
    level_num: number;
    countOfEmployees: number;
  }
  const getGrowthOfEmployeesBySkillLevel = (
    endData: EmployeesBySkillLevelData[],
    begginData: EmployeesBySkillLevelData[]
  ) => {
    return endData.map((skill) => {
      const beggingSkill = begginData.find((beggingSkill) => beggingSkill.level_num === skill.level_num);

      return {
        ...skill,
        growth: beggingSkill
          ? Math.abs(skill.countOfEmployees - beggingSkill.countOfEmployees)
          : skill.countOfEmployees,
        countOfEmployees: beggingSkill
          ? skill.countOfEmployees - beggingSkill.countOfEmployees < 0
            ? skill.countOfEmployees
            : beggingSkill.countOfEmployees
          : 0,
        wasNegative: !(skill.countOfEmployees - (beggingSkill?.countOfEmployees || 0) > 0)
      };
    });
  };

  const getHighestLevelData = (data: any) => {
    const maxLevelMap = new Map();

    data.forEach((item) => {
      const { employees_id, name, level_num } = item;
      const key = `${employees_id}_${name}`;
      if (!maxLevelMap.has(key) || level_num > maxLevelMap.get(key)) {
        maxLevelMap.set(key, level_num);
      }
    });

    const levelCountMap = new Map();

    data.forEach((item) => {
      const { employees_id, name, level_num } = item;
      const key = `${employees_id}_${name}`;
      if (maxLevelMap.get(key) === level_num) {
        if (!levelCountMap.has(level_num)) {
          levelCountMap.set(level_num, 0);
        }
        levelCountMap.set(level_num, levelCountMap.get(level_num) + 1);
      }
    });

    return Array.from(levelCountMap, ([level_num, countOfEmployees]) => ({
      level_num,
      countOfEmployees
    }));
  };

  const allTimeData = !filters.date && getHighestLevelData(departmentCountOfEmployeesBySkillLevelAllTimeDate);
  const begginData = filters.date && getHighestLevelData(departmentCountOfEmployeesBySkillLevelBeggingSelectedDate);
  const endData = filters.date && getHighestLevelData(departmentCountOfEmployeesBySkillLevelEndSelectedDate);

  console.log(allTimeData, 'allTimeData');
  const modifiedBarData = filters.date
    ? getGrowthOfEmployeesBySkillLevel(endData, begginData)
    : allTimeData.map((skill) => ({ ...skill, growth: 0, wasNegative: false }));

  if (!modifiedBarData.length) {
    return <NoChartComponent label="Нет данных" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={modifiedBarData}
        margin={{
          top: 15,
          right: 19,
          left: 15,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="colorCountOfEmployees" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#934983" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#934983" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorImprovement" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00ff00" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          label={{
            value: 'Количество сотрудников',
            angle: -90,
            position: 'inside',
            fontSize: 16,
            dy: 10,
            dx: -25,
            rotate: 0,
            textAnchor: 'start',
            fill: 'black',
            stroke: 'black',
            strokeWidth: 0,
            paintOrder: 'stroke'
          }}
        />
        <XAxis dataKey="level_num" tickFormatter={yAxisTickFormatter} tickCount={6} />
        <YAxis />
        <Tooltip content={<CustomSecondBarTooltip />} />
        <Bar
          dataKey="countOfEmployees"
          stackId="1"
          fill="url(#colorCountOfEmployees)"
          label={({ x, y, width, height, value }) => (
            <text
              x={x + width / 2}
              y={y + height / 2}
              dy={5}
              textAnchor="middle"
              fill="#000"
              fontSize={14}
              fontWeight="bold"
            >
              {value !== 0 && value}
            </text>
          )}
        />

        {filters.date && (
          <Bar dataKey="growth" stackId="1" fill="url(#colorImprovement)">
            {modifiedBarData.map((_, index) => (
              <>
                <Cell key={index} fill={'#82ca9d'} />
                <LabelList
                  key={'label' + index}
                  dataKey={'growth'}
                  position={'insideTop'}
                  fill={'#000'}
                  content={({ x, y, value, width }) => {
                    const numericValue = Number(value);

                    return (
                      <text x={x + width / 2} y={y + 15} textAnchor="middle" fill="#000" fontSize={13}>
                        {numericValue !== 0 && `+${numericValue}`}
                      </text>
                    );
                  }}
                />
              </>
            ))}
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarSecondRenderContent;
