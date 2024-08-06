import { DB1FiltersStore } from '../../store/DB1FiltersStore';
import { transformFiltersFromDB2 } from '../../utils';
import { dataService } from '../../services/DataDboard_2.service';
import { useCustomQuery } from '../useCustomQuery';
import { ITextLetDepartmentData } from '../../models';

export const useTextLetData = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB2(filters);

  const {
    data: departmentSkillsDataAllTimeDate,
    isLoading: isLoadingSkillsDataAllTimeDate,
    isError: isErrorSkillsDataAllTimeDate
  } = useCustomQuery<ITextLetDepartmentData[]>(
    ['departmentSkillsDataAllTimeDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: undefined },
        'departmentSkillsDataAllTimeDate'
      ),
    {
      enabled: !filters.date
    }
  );

  const {
    data: departmentSkillsDataBeggingSelectedDate,
    isLoading: isLoadingSkillsDataBeggingSelectedDate,
    isError: isErrorSkillsDataBeggingSelectedDate
  } = useCustomQuery<ITextLetDepartmentData[]>(
    ['departmentSkillsDataBeggingSelectedDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'departmentSkillsDataBeggingSelectedDate'
      ),
    {
      enabled: !!filters.date
    }
  );

  const {
    data: departmentSkillsDataEndSelectedDate,
    isLoading: isLoadingSkillsDataEndSelectedDate,
    isError: isErrorSkillsDataEndSelectedDate
  } = useCustomQuery<ITextLetDepartmentData[]>(
    ['departmentSkillsDataEndSelectedDate', filters],
    () =>
      dataService.fetchTextLetDepartmentData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'departmentSkillsDataEndSelectedDate'
      ),
    {
      enabled: !!filters.date
    }
  );

  const {
    data: departmentSkillsUpDataForThePeriodDate,
    isLoading: isLoadingdepartmentSkillsUpDataForThePeriodDateLoading,
    isError: isErrorDepartmentSkillsUpDataForThePeriodDate
  } = useCustomQuery<ITextLetDepartmentData[]>(
    ['departmentSkillsUpDataForThePeriodDate', filters],
    () =>
      dataService.fetchTextLetCountOfAdvancedSkillsDepartmentData(
        { ...transformedFilters, skill_status: ['=', 'up'] },
        'departmentSkillsUpDataForThePeriodDate'
      ),
    { enabled: !!filters.date }
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
