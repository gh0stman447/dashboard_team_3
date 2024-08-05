import { useQuery } from 'react-query';
import { dataService } from '../../../services/DataDboard_2.service';
import { transformFiltersFromDB2 } from '../../../utils';
import { DB2FiltersStore } from '../../../store/DB2FiltersStore';
import { getQueryFiltersForBarChart } from '../../../utils/getQueryFilters';

export const useFirstBarChartData = (filters: Partial<DB2FiltersStore>) => {
  const queryFilters = getQueryFiltersForBarChart(filters); // Преобразование фильтров для запроса

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
      enabled: !!(filters.position.length || filters.devision.length) && !filters.date,
      refetchOnWindowFocus: false
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
      enabled: !!filters?.date && !!(filters.position.length || filters.devision.length),
      refetchOnWindowFocus: false
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
    { enabled: !!filters?.date && !!(filters.position.length || filters.devision.length), refetchOnWindowFocus: false }
  );

  return {
    departmentCountOfEmployeesBySkillsAllTimeDate,
    departmentCountOfEmployeesBySkillsBeggingSelectedDate,
    departmentCountOfEmployeesBySkillsEndSelectedDate,

    isLoadingDepartmentCountOfEmployeesBySkillsAllTimeDate,
    isLoadingDepartmentCountOfEmployeesBySkillsBeggingSelectedDate,
    isLoadingDepartmentCountOfEmployeesBySkillsEndSelectedDate,

    isErrorDepartmentCountOfEmployeesBySkillsAllTimeDate,
    isErrorDepartmentCountOfEmployeesBySkillsBeggingSelectedDate,
    isErrorDepartmentCountOfEmployeesBySkillsEndSelectedDate
  };
};
