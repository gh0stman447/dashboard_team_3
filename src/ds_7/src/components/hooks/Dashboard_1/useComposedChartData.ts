import { useQuery } from 'react-query';
import { DB1FiltersStore } from '../../../store/DB1FiltersStore';
import { useEffect, useState } from 'react';
import { dataService } from '../../../services/Data.service';
import { transformFiltersFromDB1 } from '../../../utils';

export const useComposedChartData = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: employeeAllTimeData,
    isLoading: isLoadingEmployeeAllTimeData,
    isError: isErrorEmployeeAllTimeData
  } = useQuery(
    ['employeeAllTimeData', filters],
    () => dataService.fetchBarChartEmployeeData(transformedFilters, 'employeeAllTimeData'),
    {
      enabled: !!filters.empIdField && !filters.date,
      refetchOnWindowFocus: false
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
      enabled: !!filters.empIdField && !!filters.date,
      refetchOnWindowFocus: false
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
      enabled: !!filters.empIdField && !!filters.date,
      refetchOnWindowFocus: false
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
      enabled: !!filters.empIdField && !!position,
      refetchOnWindowFocus: false
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
      enabled: !!filters.empIdField && !!filters.date,
      refetchOnWindowFocus: false
    }
  );

  return {
    employeeAllTimeData,
    employeeEndSelectedDate,
    employeeBeginningSelectedDate,

    allPeopleAllTimeDate,
    allPeopleEndSelectedDate,

    isLoadingAllPeopleAllTimeDate,
    isLoadingAllPeopleEndSelectedDate,

    isLoadingEmployeeAllTimeData,
    isLoadingEmployeeBeginningSelectedDate,
    isLoadingEmployeeEndSelectedDate,

    isErrorAllPeopleAllTimeDate,
    isErrorAllPeopleEndSelectedDate,

    isErrorEmployeeBeginningSelectedDate,
    isErrorEmployeeEndSelectedDate,
    isErrorEmployeeAllTimeData,

    position
  };
};
