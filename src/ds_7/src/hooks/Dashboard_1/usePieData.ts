import { transformFiltersFromDB1 } from '../../utils';
import { DB1FiltersStore } from '../../store/DB1FiltersStore';
import { dataService } from '../../services/DataDboard_1.service';
import { useCustomQuery } from '../useCustomQuery';
import { IPieData } from '../../models';

export const usePieData = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: dataAllTimeDate,
    isLoading: isLoadingDataAllTimeDate,
    isError: isErrorDataAllTimeDate
  } = useCustomQuery<IPieData[]>(
    ['PieDataAllTimeDate', filters.date, filters.empIdField],
    () => dataService.fetchPieData(transformedFilters, 'PieDataAllTimeDate'),
    {
      enabled: !!filters?.empIdField && (!filters?.date || !filters?.date.length)
    }
  );

  const {
    data: dataBeforeSelectedDate,
    isLoading: isLoadingDataBeforeSelectedDate,
    isError: isErrorDataBeforeSelectedDate
  } = useCustomQuery<IPieData[]>(
    ['pieDataBeforeSelectedDate', filters.date, filters.empIdField],
    () =>
      dataService.fetchPieData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'PieDataBeforeSelectedDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField
    }
  );

  const {
    data: dataPrevDate,
    isLoading: isLoadingDataPrevDate,
    isError: isErrorDataPrevDate
  } = useCustomQuery<IPieData[]>(
    ['pieDataPrevDate', filters.date, filters.empIdField],
    () =>
      dataService.fetchPieData(
        { ...transformedFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'PieDataPrevDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField
    }
  );

  return {
    dataAllTimeDate,
    dataBeforeSelectedDate,
    dataPrevDate,

    isLoading: isLoadingDataAllTimeDate || isLoadingDataBeforeSelectedDate || isLoadingDataPrevDate,

    isError: isErrorDataAllTimeDate || isErrorDataBeforeSelectedDate || isErrorDataPrevDate
  };
};
