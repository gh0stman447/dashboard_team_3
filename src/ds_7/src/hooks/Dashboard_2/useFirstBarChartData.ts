import { useQuery } from 'react-query';
import { getQueryFiltersForBarChart } from '../../utils/getQueryFilters';
import { DB2FiltersStore } from '../../store/DB2FiltersStore';
import { dataService } from '../../services/DataDboard_2.service';

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
      // Делаю запрос, если в фильтрах указана должность либо подразделение и не стоит дата
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
      // Делаю запрос, если в фильтрах указана должность либо подразделение и стоит дата
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

    isLoading:
      isLoadingDepartmentCountOfEmployeesBySkillsAllTimeDate ||
      isLoadingDepartmentCountOfEmployeesBySkillsBeggingSelectedDate ||
      isLoadingDepartmentCountOfEmployeesBySkillsEndSelectedDate,

    isError:
      isErrorDepartmentCountOfEmployeesBySkillsAllTimeDate ||
      isErrorDepartmentCountOfEmployeesBySkillsBeggingSelectedDate ||
      isErrorDepartmentCountOfEmployeesBySkillsEndSelectedDate
  };
};
