import { DB2FiltersStore } from '../../store/DB2FiltersStore';
import { getQueryFiltersForBarChart } from '../../utils/getQueryFilters';
import { dataService } from '../../services/DataDboard_2.service';
import { useCustomQuery } from '../useCustomQuery';
import { ICountOfEmpBySkillLevelData } from '../../models';

export const useSecondBarChartData = (filters: Partial<DB2FiltersStore>) => {
  const queryFilters = getQueryFiltersForBarChart(filters);

  const {
    data: countOfEmployeesBySkillLevelAllTimeDate,
    isLoading: isLoadingCountOfEmployeesBySkillLevelAllTimeDate,
    isError: isErrorCountOfEmployeesBySkillLevelAllTimeDate
  } = useCustomQuery<ICountOfEmpBySkillLevelData[]>(
    ['countOfEmployeesBySkillLevelAllTimeDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: undefined },
        'countOfEmployeesBySkillLevelAllTimeDate'
      ),
    {
      enabled: !!(filters.position.length || filters.devision.length) && !filters.date
    }
  );

  const {
    data: countOfEmployeesBySkillLevelBeggingSelectedDate,
    isLoading: isLoadingCountOfEmployeesBySkillLevelBeggingSelectedDate,
    isError: isErrorCountOfEmployeesBySkillLevelBeggingSelectedDate
  } = useCustomQuery<ICountOfEmpBySkillLevelData[]>(
    ['countOfEmployeesBySkillLevelBeggingSelectedDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'countOfEmployeesBySkillLevelBeggingSelectedDate'
      ),
    {
      enabled: !!filters?.date
    }
  );

  const {
    data: countOfEmployeesBySkillLevelEndSelectedDate,
    isLoading: isLoadingCountOfEmployeesBySkillLevelEndSelectedDate,
    isError: isErrorCountOfEmployeesBySkillLevelEndSelectedDate
  } = useCustomQuery<ICountOfEmpBySkillLevelData[]>(
    ['countOfEmployeesBySkillLevelEndSelectedDate', filters],
    () =>
      dataService.fetchBarDataCountOfEmployeesBySkillLevel(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'countOfEmployeesBySkillLevelEndSelectedDate'
      ),
    { enabled: !!filters?.date }
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
