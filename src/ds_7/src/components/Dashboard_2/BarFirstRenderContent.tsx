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
  Brush,
  LabelList,
  Cell
} from 'recharts';
import { transformFiltersFromDB2 } from '../../utils';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard2.service';
import NoChartComponent from '../ui/NoChartComponent';
import CustomFirstBarTooltip from '../ui/Dashboard_2/CustomFirstBarTooltip';

const BarFirstRenderContent = () => {
  const filters = useDB2FiltersStore((state) => ({
    date: state.date,
    position: state.position,
    devision: state.devision,
    typesOfSkill: state.typesOfSkill
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
    data: departmentCountOfEmployeesBySkillsAllTimeDate,
    isLoading: isLoadingDepartmentCountOfEmployeesBySkillsAllTimeDate,
    isError: isErrorDepartmentCountOfEmployeesBySkillsAllTimeDate
  } = useQuery(
    ['departmentCountOfEmployeesBySkillsAllTimeDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkills(
        { ...queryFilters, date: undefined },
        'departmentCountOfEmployeesBySkillsAllTimeDate'
      ),
    {
      enabled: !!(filters.position.length || filters.devision.length) && !filters.date
    }
  );

  const {
    data: departmentCountOfEmployeesBySkillsBeggingSelectedDate,
    isLoading: isLoadingDepartmentCountOfEmployeesBySkillsBeggingSelectedDate,
    isError: isErrorDepartmentCountOfEmployeesBySkillsBeggingSelectedDate
  } = useQuery(
    ['departmentCountOfEmployeesBySkillsBeggingSelectedDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkills(
        { ...queryFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'departmentCountOfEmployeesBySkillsBeggingSelectedDate'
      ),
    {
      enabled: !!filters?.date && !!(filters.position.length || filters.devision.length)
    }
  );

  const {
    data: departmentCountOfEmployeesBySkillsEndSelectedDate,
    isLoading: isLoadingDepartmentCountOfEmployeesBySkillsEndSelectedDate,
    isError: isErrorDepartmentCountOfEmployeesBySkillsEndSelectedDate
  } = useQuery(
    ['departmentCountOfEmployeesBySkillsEndSelectedDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkills(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'departmentCountOfEmployeesBySkillsEndSelectedDate'
      ),
    { enabled: !!filters?.date && !!(filters.position.length || filters.devision.length) }
  );

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

  interface EmployeesBySkillsData {
    name: string;
    countOfEmployees: number;
  }

  const getGrowthOfEmployeesBySkills = (endData: EmployeesBySkillsData[], begginData: EmployeesBySkillsData[]) => {
    return endData.map((skill) => {
      const beggingSkill = begginData.find((beggingSkill) => beggingSkill.name === skill.name);

      console.log('begginData', begginData);
      console.log('endData', endData);
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

  console.log(modifiedBarData, 'modifiedBarData');

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={modifiedBarData}
        margin={{
          top: 40,
          right: 50,
          left: 30,
          bottom: 15
        }}
      >
        <Brush startIndex={0} endIndex={6} travellerWidth={5} height={30} stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          label={{
            value: 'Количество сотрудников',
            angle: -90,
            position: 'inside',
            fontSize: 19,
            dy: 40,
            dx: -30,
            fill: 'black'
          }}
        />
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip content={<CustomFirstBarTooltip />} />
        <Legend сontent={<CustomLegend />} />
        <Bar
          dataKey="countOfEmployees"
          stackId="1"
          fill="#8884d8"
          label={({ x, y, width, height, value }) => (
            <text
              x={x + width / 2}
              y={y + height / 2}
              dy={5} // Позиционирование текста чуть ниже центра
              textAnchor="middle"
              fill="#000"
              fontSize={14} // Увеличение размера шрифта
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
                    return (
                      <text
                        x={x + width / 2} // Центрируем по горизонтали
                        y={y + 20} // Поднимаем текст вверх
                        textAnchor="middle" // Центрируем текст по горизонтали
                        fill="#000"
                        fontSize={15}
                      >
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
