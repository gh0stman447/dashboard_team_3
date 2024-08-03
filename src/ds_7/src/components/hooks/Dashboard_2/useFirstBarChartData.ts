import { useQuery } from 'react-query';
import { dataService } from '../../../services/DataDboard2.service';
import { transformFiltersFromDB2 } from '../../../utils';
import { DB2FiltersStore } from '../../../store/DB2FiltersStore';

export const useFirstBarChartData = (filters: Partial<DB2FiltersStore>) => {
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
