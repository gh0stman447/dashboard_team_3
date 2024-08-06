import React from 'react';
import { ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Bar, BarChart, Cell, LabelList } from 'recharts';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import NoChartComponent from '../ui/NoChartComponent';
import CustomSecondBarTooltip from '../ui/Charts/Dashboard_2/CustomSecondBarTooltip';
import { useSecondBarChartData } from '../hooks/Dashboard_2';
import { LEVEL_NAMES } from '../../constants';
import { getGrowthOfEmployeesForBarChart, getHighestLevelDataForBarChart } from '../../utils';

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
          <linearGradient id="colorcountOfEmployees" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#colorcountOfEmployees)"
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