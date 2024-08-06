import { transformFiltersFromDB2 } from '../../utils';
import { DB2FiltersStore } from '../../store/DB2FiltersStore';
import { dataService } from '../../services/DataDboard_2.service';
import { useCustomQuery } from '../useCustomQuery';
import { IPieData } from '../../models';

export const usePieData = (filters: Partial<DB2FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB2(filters); // Преобразование фильтров для запроса

  const queryFilters =
    filters.position.length === 0 && filters.devision.length === 0
      ? { ...transformedFilters }
      : filters.position.length === 0 && filters.devision.length > 0
      ? { ...transformedFilters, is_depart_key_skill_type: ['=', true] }
      : filters.devision.length === 0 && filters.position.length > 0
      ? { ...transformedFilters, is_job_key_skill_type: ['=', true] }
      : { ...transformedFilters, is_job_key_skill_type: ['=', true] };

  const {
    data: departmentDataAllTimeDate,
    isLoading: isLoadingDepartmentAllTimeDate,
    isError: isErrorDepartmentAllTimeDate
  } = useCustomQuery<IPieData[]>(
    ['departmentPieDataAllTimeDate', filters],
    () => dataService.fetchPieDepartmentData({ ...queryFilters, date: undefined }, 'departmentPieDataAllTimeDate'),
    {
      enabled: !filters.date
    }
  );

  const {
    data: departmentDataBegginingSelectedDate,
    isLoading: isLoadingDepartmentDataBegginingSelectedDate,
    isError: isErrorDepartmentDataBegginingSelectedDate
  } = useCustomQuery<IPieData[]>(
    ['departmentPieDataBegginingSelectedDate', filters],
    () =>
      dataService.fetchPieDepartmentData(
        { ...queryFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'departmentPieDataBegginingSelectedDate'
      ),
    {
      enabled: !!filters?.date
    }
  );

  const {
    data: departmentDataEndSelectedDate,
    isLoading: isLoadingDepartmentDataEndSelectedDate,
    isError: isErrorDepartmentDataEndSelectedDate
  } = useCustomQuery<IPieData[]>(
    ['departmentPieDataEndSelectedDate', filters],
    () =>
      dataService.fetchPieDepartmentData(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'departmentPieDataEndSelectedDate'
      ),
    {
      enabled: !!filters?.date
    }
  );

  return {
    departmentDataAllTimeDate,
    departmentDataBegginingSelectedDate,
    departmentDataEndSelectedDate,

    isLoading:
      isLoadingDepartmentAllTimeDate ||
      isLoadingDepartmentDataBegginingSelectedDate ||
      isLoadingDepartmentDataEndSelectedDate,

    isError:
      isErrorDepartmentAllTimeDate || isErrorDepartmentDataBegginingSelectedDate || isErrorDepartmentDataEndSelectedDate
  };
};
