import React from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  BarChart,
  Cell,
  LabelList
} from 'recharts';
import { transformFiltersFromDB2 } from '../../utils';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard2.service';
import NoChartComponent from '../ui/NoChartComponent';
import CustomSecondBarTooltip from '../ui/Dashboard_2/CustomSecondBarTooltip';
import { LEVEL_NAMES } from '../../constants/Dashboard_2';

const BarSecondRenderContent = () => {
  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision,
    typesOfSkill: state.typesOfSkill,
    skills: state.skills
  }));

  const transformedFilters = transformFiltersFromDB2(filters);

  const queryFilters =
    filters.position.length === 0 && filters.devision.length === 0
      ? { ...transformedFilters }
      : filters.position.length === 0 && filters.devision.length > 0
      ? { ...transformedFilters, is_depart_key_skill: ['=', true] }
      : filters.devision.length === 0 && filters.position.length > 0
      ? { ...transformedFilters, is_job_key_skill: ['=', true] }
      : { ...transformedFilters, is_job_key_skill: ['=', true] };

  const {
    data: departmentCountOfEmployeesBySkillLevelAllTimeDate,
    isLoading: isLoadingDepartmentCountOfEmployeesBySkillLevelAllTimeDate,
    isError: isErrorDepartmentCountOfEmployeesBySkillLevelAllTimeDate
  } = useQuery(
    ['departmentCountOfEmployeesBySkillLevelAllTimeDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: undefined },
        'departmentCountOfEmployeesBySkillLevelAllTimeDate'
      ),
    {
      enabled: !!(filters.position.length || filters.devision.length) && !filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: departmentCountOfEmployeesBySkillLevelBeggingSelectedDate,
    isLoading: isLoadingDepartmentCountOfEmployeesBySkillLevelBeggingSelectedDate,
    isError: isErrorDepartmentCountOfEmployeesBySkillLevelBeggingSelectedDate
  } = useQuery(
    ['departmentCountOfEmployeesBySkillLevelBeggingSelectedDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'departmentCountOfEmployeesBySkillLevelBeggingSelectedDate'
      ),
    {
      enabled: !!filters?.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: departmentCountOfEmployeesBySkillLevelEndSelectedDate,
    isLoading: isLoadingDepartmentCountOfEmployeesBySkillLevelEndSelectedDate,
    isError: isErrorDepartmentCountOfEmployeesBySkillLevelEndSelectedDate
  } = useQuery(
    ['departmentCountOfEmployeesBySkillLevelEndSelectedDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'departmentCountOfEmployeesBySkillLevelEndSelectedDate'
      ),
    { enabled: !!filters?.date, refetchOnWindowFocus: false }
  );

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

  const CustomLegend = (props) => {
    const { payload } = props;

    return (
      <div className="p-2 flex items-center justify-center gap-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ marginBottom: '5px' }} className="flex items-center">
            <span
              style={{
                backgroundColor: entry.payload.fill,
                width: '20px',
                height: '20px',
                display: 'inline-block',
                marginRight: '10px'
              }}
            />
            {entry.value === 'countOfEmployees' ? 'Количество сотрудников' : 'Прирост'}
          </div>
        ))}
      </div>
    );
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

  const modifiedBarData = filters.date
    ? getGrowthOfEmployeesBySkillLevel(
        departmentCountOfEmployeesBySkillLevelEndSelectedDate,
        departmentCountOfEmployeesBySkillLevelBeggingSelectedDate
      )
    : departmentCountOfEmployeesBySkillLevelAllTimeDate.map((skill) => ({ ...skill, growth: 0, wasNegative: false }));

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
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          label={{
            value: 'Количество сотрудников',
            angle: -90,
            position: 'inside',
            fontSize: 19,
            dy: 20,
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
        <Legend content={<CustomLegend />} />
        <Bar
          dataKey="countOfEmployees"
          stackId="1"
          fill="#8884d8"
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
          <Bar dataKey="growth" stackId="1" fill="#82ca9d">
            {modifiedBarData.map((item, index) => (
              <>
                <Cell key={index} fill={'#82ca9d'} />
                <LabelList
                  key={'label' + index}
                  dataKey={'growth'}
                  position={'insideTop'}
                  fill={'#000'}
                  content={({ x, y, value, width, height }) => {
                    const numericValue = Number(value);

                    return (
                      <text
                        x={x + width / 2} // Центрируем по горизонтали
                        y={y + 20} // Поднимаем текст вверх
                        textAnchor="middle" // Центрируем текст по горизонтали
                        fill="#000"
                        fontSize={15}
                      >
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
