import { useQuery } from 'react-query';
import { DB2FiltersStore } from '../../store/DB2FiltersStore';
import { getQueryFiltersForBarChart } from '../../utils/getQueryFilters';
import { dataService } from '../../services/DataDboard_2.service';

export const useSecondBarChartData = (filters: Partial<DB2FiltersStore>) => {
  const queryFilters = getQueryFiltersForBarChart(filters);

  const {
    data: countOfEmployeesBySkillLevelAllTimeDate,
    isLoading: isLoadingCountOfEmployeesBySkillLevelAllTimeDate,
    isError: isErrorCountOfEmployeesBySkillLevelAllTimeDate
  } = useQuery(
    ['countOfEmployeesBySkillLevelAllTimeDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: undefined },
        'countOfEmployeesBySkillLevelAllTimeDate'
      ),
    {
      enabled: !!(filters.position.length || filters.devision.length) && !filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: countOfEmployeesBySkillLevelBeggingSelectedDate,
    isLoading: isLoadingCountOfEmployeesBySkillLevelBeggingSelectedDate,
    isError: isErrorCountOfEmployeesBySkillLevelBeggingSelectedDate
  } = useQuery(
    ['countOfEmployeesBySkillLevelBeggingSelectedDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'countOfEmployeesBySkillLevelBeggingSelectedDate'
      ),
    {
      enabled: !!filters?.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: countOfEmployeesBySkillLevelEndSelectedDate,
    isLoading: isLoadingCountOfEmployeesBySkillLevelEndSelectedDate,
    isError: isErrorCountOfEmployeesBySkillLevelEndSelectedDate
  } = useQuery(
    ['countOfEmployeesBySkillLevelEndSelectedDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'countOfEmployeesBySkillLevelEndSelectedDate'
      ),
    { enabled: !!filters?.date, refetchOnWindowFocus: false }
  );

  return {
    countOfEmployeesBySkillLevelAllTimeDate,
    countOfEmployeesBySkillLevelBeggingSelectedDate,
    countOfEmployeesBySkillLevelEndSelectedDate,

    isLoading:
      isLoadingCountOfEmployeesBySkillLevelAllTimeDate ||
      isLoadingCountOfEmployeesBySkillLevelBeggingSelectedDate ||
      isLoadingCountOfEmployeesBySkillLevelEndSelectedDate,

    isError:
      isErrorCountOfEmployeesBySkillLevelAllTimeDate ||
      isErrorCountOfEmployeesBySkillLevelBeggingSelectedDate ||
      isErrorCountOfEmployeesBySkillLevelEndSelectedDate
  };
};
