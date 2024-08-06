import { useQuery } from 'react-query';
import { DB1FiltersStore } from '../../../store/DB1FiltersStore';
import { dataService } from '../../../services/DataDboard_2.service';
import { transformFiltersFromDB2 } from '../../../utils';

export const useTextLetData = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB2(filters);

  const {
    data: departmentSkillsDataAllTimeDate,
    isLoading: isLoadingSkillsDataAllTimeDate,
    isError: isErrorSkillsDataAllTimeDate
  } = useQuery(
    ['departmentSkillsDataAllTimeDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: undefined },
        'departmentSkillsDataAllTimeDate'
      ),
    {
      enabled: !filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: departmentSkillsDataBeggingSelectedDate,
    isLoading: isLoadingSkillsDataBeggingSelectedDate,
    isError: isErrorSkillsDataBeggingSelectedDate
  } = useQuery(
    ['departmentSkillsDataBeggingSelectedDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'departmentSkillsDataBeggingSelectedDate'
      ),
    {
      enabled: !!filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: departmentSkillsDataEndSelectedDate,
    isLoading: isLoadingSkillsDataEndSelectedDate,
    isError: isErrorSkillsDataEndSelectedDate
  } = useQuery(
    ['departmentSkillsDataEndSelectedDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'departmentSkillsDataEndSelectedDate'
      ),
    {
      enabled: !!filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: departmentSkillsUpDataForThePeriodDate,
    isLoading: isLoadingdepartmentSkillsUpDataForThePeriodDateLoading,
    isError: isErrorDepartmentSkillsUpDataForThePeriodDate
  } = useQuery(
    ['departmentSkillsUpDataForThePeriodDate', filters],
    () =>
      dataService.fetchTextLetCountOfAdvancedSkillsDepartmentData(
        { ...transformedFilters, skill_status: ['=', 'up'] },
        'departmentSkillsUpDataForThePeriodDate'
      ),
    {
      enabled: !!filters.date,
      refetchOnWindowFocus: false
    }
  );

  return {
    departmentSkillsDataAllTimeDate,
    departmentSkillsDataBeggingSelectedDate,
    departmentSkillsDataEndSelectedDate,
    departmentSkillsUpDataForThePeriodDate,

    isLoading:
      isLoadingSkillsDataAllTimeDate ||
      isLoadingSkillsDataBeggingSelectedDate ||
      isLoadingSkillsDataEndSelectedDate ||
      isLoadingdepartmentSkillsUpDataForThePeriodDateLoading,

    isError:
      isErrorSkillsDataAllTimeDate ||
      isErrorSkillsDataBeggingSelectedDate ||
      isErrorSkillsDataEndSelectedDate ||
      isErrorDepartmentSkillsUpDataForThePeriodDate
  };
};
