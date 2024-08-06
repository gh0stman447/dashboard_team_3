import { DB2FiltersStore } from '../../store/DB2FiltersStore';
import { transformFiltersFromDB2 } from '../../utils';
import { dataService } from '../../services/DataDboard_2.service';
import { useCustomQuery } from '../useCustomQuery';
import { IAllSkillsData } from '../../models';

export const useSKillsData = (filters: Partial<DB2FiltersStore>) => {
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
    data: skillsAllTimeDate,
    isLoading: isLoadingSkillsAllTimeDate,
    isError: isErrorSkillsAllTimeDate
  } = useCustomQuery<IAllSkillsData[]>(
    ['skillsAllTimeDate', filters],
    () => dataService.fetchSkillsData({ ...queryFilters, date: undefined }, 'skillsAllTimeDate'),
    {
      enabled: !filters.date
    }
  );

  const {
    data: skillsEndSelectedDate,
    isLoading: isLoadingSkillsEndSelectedDate,
    isError: isErrorSkillsEndSelectedDate
  } = useCustomQuery<IAllSkillsData[]>(
    ['skillsEndSelectedDate', filters],
    () =>
      dataService.fetchSkillsData(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'skillsEndSelectedDate'
      ),
    {
      enabled: !!filters.date
    }
  );

  return {
    skillsAllTimeDate,
    skillsEndSelectedDate,

    isLoading: isLoadingSkillsAllTimeDate || isLoadingSkillsEndSelectedDate,

    isError: isErrorSkillsAllTimeDate || isErrorSkillsEndSelectedDate
  };
};
