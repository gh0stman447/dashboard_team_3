import React from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Brush,
  LabelList,
  Cell
} from 'recharts';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import NoChartComponent from '../ui/NoChartComponent';
import CustomFirstBarTooltip from '../ui/Dashboard_2/CustomFirstBarTooltip';
import { useFirstBarChartData } from '../hooks/Dashboard_2';

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
    isErrorDepartmentCountOfEmployeesBySkillsAllTimeDate,
    isErrorDepartmentCountOfEmployeesBySkillsBeggingSelectedDate,
    isErrorDepartmentCountOfEmployeesBySkillsEndSelectedDate,
    isLoadingDepartmentCountOfEmployeesBySkillsAllTimeDate,
    isLoadingDepartmentCountOfEmployeesBySkillsBeggingSelectedDate,
    isLoadingDepartmentCountOfEmployeesBySkillsEndSelectedDate
  } = useFirstBarChartData(filters);

  if (!filters.position.length && !filters.devision.length) {
    return <NoChartComponent label="Выберите должность или подразделение" />;
  }

  if (
    isLoadingDepartmentCountOfEmployeesBySkillsAllTimeDate ||
    isLoadingDepartmentCountOfEmployeesBySkillsBeggingSelectedDate ||
    isLoadingDepartmentCountOfEmployeesBySkillsEndSelectedDate
  ) {
    return <NoChartComponent label="Загрузка..." />;
  }

  if (
    isErrorDepartmentCountOfEmployeesBySkillsAllTimeDate ||
    isErrorDepartmentCountOfEmployeesBySkillsBeggingSelectedDate ||
    isErrorDepartmentCountOfEmployeesBySkillsEndSelectedDate
  ) {
    return <NoChartComponent label="Ошибка" />;
  }

  interface EmployeesBySkillsData {
    name: string;
    countOfEmployees: number;
  }

  const getGrowthOfEmployeesBySkills = (endData: EmployeesBySkillsData[], begginData: EmployeesBySkillsData[]) => {
    return endData.map((skill) => {
      const beggingSkill = begginData.find((beggingSkill) => beggingSkill.name === skill.name);

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

  const modifiedBarData = filters.date
    ? getGrowthOfEmployeesBySkills(
        departmentCountOfEmployeesBySkillsEndSelectedDate,
        departmentCountOfEmployeesBySkillsBeggingSelectedDate
      )
    : departmentCountOfEmployeesBySkillsAllTimeDate.map((skill) => ({ ...skill, growth: 0, wasNegative: false }));

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
          bottom: 20
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
        <Brush dataKey={'name'} startIndex={0} endIndex={2} travellerWidth={5} height={30} stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          label={{
            value: 'Количество сотрудников',
            angle: -90,
            position: 'inside',
            fontSize: 16,
            dy: 20,
            dx: -25,
            fill: 'black'
          }}
        />
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip content={<CustomFirstBarTooltip />} />
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
            {modifiedBarData.map((item, index) => (
              <>
                <Cell key={index} fill={'#82ca9d'} />
                <LabelList
                  key={'label' + index}
                  dataKey={'growth'}
                  position={'insideTop'}
                  fill={'#000'}
                  content={({ x, y, value, width, height }) => {
                    return (
                      <text x={x + width / 2} y={y + 15} textAnchor="middle" fill="#000" fontSize={13}>
                        {value !== 0 && `+${value}`}
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

export default BarFirstRenderContent;
