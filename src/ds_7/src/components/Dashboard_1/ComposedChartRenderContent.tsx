import React from 'react';
import {
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Brush
} from 'recharts';
import { useQuery } from 'react-query';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { dataService } from '../../services/Data.service';
import { LEVEL_NAMES } from '../../constants/Dashboard_2/levelNames';
import { useEffect, useState } from 'react';

import { transformFiltersFromDB1 } from '../../utils';

const ComposedChartRenderContent = () => {
  const filters = useDB1FiltersStore((state) => ({
    date: state.date,
    empIdField: state.empIdField,
    typesOfSkill: state.typesOfSkill
  }));

  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: employeeAllTimeData,
    isLoading: isLoagindEmployeeAllTimeData,
    isError: isErrorEmployeeAllTimeData
  } = useQuery(
    ['employeeAllTimeData', filters],
    () => dataService.fetchBarChartEmployeeData(transformedFilters, 'employeeAllTimeData'),
    {
      enabled: !!filters.empIdField
    }
  );

  const {
    data: employeeEndSelectedDate,
    isLoading: isLoadingEmployeeEndSelectedDate,
    isError: isErrorEmployeeEndSelectedDate
  } = useQuery(
    ['employeeEndSelectedDate', filters],
    () =>
      dataService.fetchBarChartEmployeeData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'employeeEndSelectedDate'
      ),
    {
      enabled: !!filters.empIdField && !!filters.date
    }
  );

  const {
    data: employeeBeginningSelectedDate,
    isLoading: isLoadingEmployeeBeginningSelectedDate,
    isError: isErrorEmployeeBeginningSelectedDate
  } = useQuery(
    ['employeeBeginningSelectedDate', filters],
    () =>
      dataService.fetchBarChartEmployeeData(
        { ...transformedFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'employeeBeginningSelectedDate'
      ),
    {
      enabled: !!filters.empIdField && !!filters.date
    }
  );

  const [position, setPosition] = useState<string | null>(null);

  useEffect(() => {
    if (employeeAllTimeData && employeeAllTimeData.length > 0) {
      setPosition(employeeAllTimeData[0].job_title);
    }
  }, [employeeAllTimeData]);

  const {
    data: allPeopleAllTimeDate,
    isLoading: isLoadingAllPeopleAllTimeDate,
    isError: isErrorAllPeopleAllTimeDate
  } = useQuery(
    ['allPeopleAllTimeDate', filters],
    () =>
      dataService.fetchBarChartAllPeopleData(
        { ...transformedFilters, job_title: ['=', position], employees_id: undefined, date: undefined },
        'allPeopleAllTimeDate'
      ),
    {
      enabled: !!filters.empIdField && !!position
    }
  );

  const {
    data: allPeopleEndSelectedDate,
    isLoading: isLoadingAllPeopleEndSelectedDate,
    isError: isErrorAllPeopleEndSelectedDate
  } = useQuery(
    ['allPeopleEndSelectedDate', filters],
    () =>
      dataService.fetchBarChartAllPeopleData(
        {
          ...transformedFilters,
          employees_id: undefined,
          job_title: ['=', position],
          date: ['<=', filters.date[1].format('YYYY-MM-DD')]
        },
        'allPeopleEndSelectedDate'
      ),
    {
      enabled: !!filters.empIdField && !!filters.date
    }
  );

  if (
    isLoadingAllPeopleAllTimeDate ||
    isLoadingAllPeopleEndSelectedDate ||
    isLoadingEmployeeBeginningSelectedDate ||
    isLoadingEmployeeEndSelectedDate ||
    isLoagindEmployeeAllTimeData
  ) {
    return <div className="flex h-full justify-center items-center">Loading...</div>;
  }

  if (
    isErrorAllPeopleAllTimeDate ||
    isErrorAllPeopleEndSelectedDate ||
    isErrorEmployeeBeginningSelectedDate ||
    isErrorEmployeeEndSelectedDate ||
    isErrorEmployeeAllTimeData
  ) {
    return <div className="flex h-full justify-center items-center">Error</div>;
  }

  if (!filters.empIdField || !position) {
    return <div className="flex h-full justify-center items-center">No employee selected</div>;
  }

  const yAxisTickFormatter = (value: string) => {
    return LEVEL_NAMES[value] || null;
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
      console.log(improvement, 'improvement');
      return {
        name: endSkill.name,
        empLvl: endSkill.level_num,
        improvement
      };
    });
    // return endData.map((endSkill) => {
    //   const beginSkill = beginData.find((skill) => skill.name === endSkill.name);
    //   const improvement = beginSkill ? endSkill.level_num - beginSkill.level_num : endSkill.level_num;
    //   console.log(improvement, 'improvement');
    //   return {
    //     name: endSkill.name,
    //     empLvl: beginSkill ? endSkill.level_num : 0,
    //     improvement
    //   };
    // });
  };

  const getAverageLevel = (skillName, allPeopleData) => {
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
    middleLvl: getAverageLevel(skill.name, peopleData)
  }));

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
        <Brush startIndex={0} endIndex={modifiedBarData.length - 1} travellerWidth={20} height={30} stroke="#8884d8" />
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis tickFormatter={yAxisTickFormatter} tickCount={5} />
        <Tooltip />
        {/* <Legend /> */}
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
