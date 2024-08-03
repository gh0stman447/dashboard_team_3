import { useQuery } from 'react-query';
import { dataService } from '../../../services/DataDboard2.service';
import { DB2FiltersStore } from '../../../store/DB2FiltersStore';
import { transformFiltersFromDB2 } from '../../../utils';

export const useSecondBarChartData = (filters: Partial<DB2FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB2(filters);

  const queryFilters = (() => {
    const hasPosition = filters.position.length > 0;
    const hasDevision = filters.devision.length > 0;
    const hasTypesOfSkill = filters.typesOfSkill.length > 0;

    if (hasPosition && hasDevision && hasTypesOfSkill) {
      return { ...transformedFilters, is_job_key_skill_type_skill: ['=', true] };
    }

    if (hasPosition && hasDevision) {
      return { ...transformedFilters, is_job_key_skill: ['=', true] };
    }

    if (hasPosition && hasTypesOfSkill) {
      return { ...transformedFilters, is_job_key_skill_type_skill: ['=', true] };
    }

    if (hasDevision && hasTypesOfSkill) {
      return { ...transformedFilters, is_depart_key_skill: ['=', true] };
    }

    if (hasPosition) {
      return { ...transformedFilters, is_job_key_skill: ['=', true] };
    }

    if (hasDevision) {
      return { ...transformedFilters, is_depart_key_skill: ['=', true] };
    }

    return { ...transformedFilters };
  })();

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

  return {
    departmentCountOfEmployeesBySkillLevelAllTimeDate,
    departmentCountOfEmployeesBySkillLevelBeggingSelectedDate,
    departmentCountOfEmployeesBySkillLevelEndSelectedDate,

    isLoadingDepartmentCountOfEmployeesBySkillLevelAllTimeDate,
    isLoadingDepartmentCountOfEmployeesBySkillLevelBeggingSelectedDate,
    isLoadingDepartmentCountOfEmployeesBySkillLevelEndSelectedDate,

    isErrorDepartmentCountOfEmployeesBySkillLevelAllTimeDate,
    isErrorDepartmentCountOfEmployeesBySkillLevelBeggingSelectedDate,
    isErrorDepartmentCountOfEmployeesBySkillLevelEndSelectedDate
  };
};
