import React from 'react';
import { ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar, BarChart, Brush } from 'recharts';
import { downloadPng, recalculateImprovement, transformFiltersFromDB2 } from '../../utils';
import { BAR_DATA } from '../../constants/Dashboard_2';
import { Download } from '../../../../assets';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard2.service';

const BarFirstBlock = () => {
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);
  const barChartRef = React.useRef<HTMLDivElement | null>(null);

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
  } = useQuery(['departmentCountOfEmployeesBySkillsAllTimeDate', filters], () =>
    dataService.fetchBarDataCountOfEmployeesBySkills(
      { ...queryFilters, date: undefined },
      'departmentCountOfEmployeesBySkillsAllTimeDate'
    )
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
      enabled: !!filters?.date
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
    { enabled: !!filters?.date }
  );

  if (
    isLoadingDepartmentCountOfEmployeesBySkillsAllTimeDate ||
    isLoadingDepartmentCountOfEmployeesBySkillsBeggingSelectedDate ||
    isLoadingDepartmentCountOfEmployeesBySkillsEndSelectedDate
  ) {
    return <div>Loading...</div>;
  }

  if (
    isErrorDepartmentCountOfEmployeesBySkillsAllTimeDate ||
    isErrorDepartmentCountOfEmployeesBySkillsBeggingSelectedDate ||
    isErrorDepartmentCountOfEmployeesBySkillsEndSelectedDate
  ) {
    return <div>Error</div>;
  }

  if (!filters.position.length && !filters.devision.length) {
    return <div>Выберите позицию или подразделение</div>;
  }
  interface EmployeesBySkillsData {
    name: string;
    countOfEmployees: number;
  }

  console.log(departmentCountOfEmployeesBySkillsAllTimeDate);

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
        wasNegative: !((skill.countOfEmployees - beggingSkill?.countOfEmployees || 0) > 0)
      };
    });
  };

  const modifiedBarData = filters.date
    ? getGrowthOfEmployeesBySkills(
        departmentCountOfEmployeesBySkillsEndSelectedDate,
        departmentCountOfEmployeesBySkillsBeggingSelectedDate
      )
    : departmentCountOfEmployeesBySkillsAllTimeDate.map((skill) => ({ ...skill, growth: 0, wasNegative: false }));

  return (
    <div
      className="w-full 2xl:w-1/2 border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50"
      ref={barChartRef}
    >
      <div className="relative w-full h-[400px] 2xl:h-[800px]">
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
            <Brush startIndex={0} endIndex={4} travellerWidth={5} height={30} stroke="#8884d8" />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              label={{ value: 'Количество сотрудников', angle: -90, position: 'inside', fontSize: 20 }}
              tickCount={10}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="countOfEmployees" stackId="1" fill="#8884d8" /* background={{ fill: '#eee' }} */ />
            {filters.date && (
              <Bar
                dataKey="growth"
                stackId="1"
                fill="#82ca9d"
                shape={(props) => {
                  const { fill, x, y, width, height, value } = props;
                  const color = modifiedBarData[value]?.wasNegative ? '#ff6f6f' : '#82ca9d';
                  return <rect x={x} y={y} width={width} height={height} fill={color} />;
                }}
              />
            )}
            {/* <Bar dataKey="growth" stackId="1" fill="#82ca9d" /> */}
          </BarChart>
        </ResponsiveContainer>

        <div className="absolute bottom-[10px] left-[10px]">
          <Download
            className="w-[14px] h-[14px] md-lg:w-[20px] md-lg:h-[20px] 4xl:w-[30px] 4xl:h-[30px]"
            ref={downloadButtonRef}
            onClick={() => downloadPng(downloadButtonRef, barChartRef)}
          />
        </div>
      </div>
    </div>
  );
};

export default BarFirstBlock;
