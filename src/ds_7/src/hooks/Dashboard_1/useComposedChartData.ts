import { useEffect, useState } from 'react';
import { DB1FiltersStore } from '../../store/DB1FiltersStore';
import { transformFiltersFromDB1 } from '../../utils';
import { dataService } from '../../services/DataDboard_1.service';
import { useCustomQuery } from '../useCustomQuery';
import { IBarChartAllPeopleData, IBarChartEmployeeData } from '../../models';

export const useComposedChartData = (filters: Partial<DB1FiltersStore>) => {
  const [position, setPosition] = useState<string | null>(null);
  const [resetPosition, setResetPosition] = useState<boolean>(false);

  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: employeeAllTimeData,
    isLoading: isLoadingEmployeeAllTimeData,
    isError: isErrorEmployeeAllTimeData
  } = useCustomQuery<IBarChartEmployeeData[]>(
    ['employeeAllTimeData', filters],
    () => dataService.fetchBarChartEmployeeData(transformedFilters, 'employeeAllTimeData'),
    {
      enabled: !!filters.empIdField && !filters.date,
      onSuccess: (data) => {
        if (data && data.length > 0) {
          setPosition(data[0].job_title);
          setResetPosition(true); // Ставим флаг в true после раждого запроса, чтобы сбросить значение position в null. Иначе в запрос будет уходить предыдущее значение
        }
      }
    }
  );

  useEffect(() => {
    if (resetPosition) {
      setPosition(null);
      setResetPosition(false);
    }
  }, [resetPosition]);

  const {
    data: employeeEndSelectedDate,
    isLoading: isLoadingEmployeeEndSelectedDate,
    isError: isErrorEmployeeEndSelectedDate
  } = useCustomQuery<IBarChartEmployeeData[]>(
    ['employeeEndSelectedDate', filters],
    () =>
      dataService.fetchBarChartEmployeeData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'employeeEndSelectedDate'
      ),
    {
      enabled: !!filters.empIdField && !!filters.date,
      onSuccess: (data) => {
        if (data && data.length > 0) {
          setPosition(data[0].job_title);
          setResetPosition(true);
        }
      }
    }
  );

  const {
    data: employeeBeginningSelectedDate,
    isLoading: isLoadingEmployeeBeginningSelectedDate,
    isError: isErrorEmployeeBeginningSelectedDate
  } = useCustomQuery<IBarChartEmployeeData[]>(
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

  const {
    data: allPeopleAllTimeDate,
    isLoading: isLoadingAllPeopleAllTimeDate,
    isError: isErrorAllPeopleAllTimeDate
  } = useCustomQuery<IBarChartAllPeopleData[]>(
    ['allPeopleAllTimeDate', filters],
    () =>
      dataService.fetchBarChartAllPeopleData(
        { ...transformedFilters, job_title: ['=', position], employees_id: undefined, date: undefined },
        'allPeopleAllTimeDate'
      ),
    {
      enabled: !!filters.empIdField && !!position //Пока нет фильтра по должности и по айди сотрудника, запрос не будет вызываться
    }
  );

  const {
    data: allPeopleEndSelectedDate,
    isLoading: isLoadingAllPeopleEndSelectedDate,
    isError: isErrorAllPeopleEndSelectedDate
  } = useCustomQuery<IBarChartAllPeopleData[]>(
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

  return {
    employeeAllTimeData,
    employeeEndSelectedDate,
    employeeBeginningSelectedDate,

    allPeopleAllTimeDate,
    allPeopleEndSelectedDate,

    isLoading:
      isLoadingAllPeopleAllTimeDate ||
      isLoadingAllPeopleEndSelectedDate ||
      isLoadingEmployeeAllTimeData ||
      isLoadingEmployeeBeginningSelectedDate ||
      isLoadingEmployeeEndSelectedDate,

    isError:
      isErrorAllPeopleAllTimeDate ||
      isErrorAllPeopleEndSelectedDate ||
      isErrorEmployeeBeginningSelectedDate ||
      isErrorEmployeeEndSelectedDate ||
      isErrorEmployeeAllTimeData
  };
};
