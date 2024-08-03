import { DB1FiltersStore } from '../../../store/DB1FiltersStore';
import { useQuery } from 'react-query';

import { transformFiltersFromDB1 } from '../../../utils/transformFilters';
import { dataService } from '../../../services/Data.service';

export const usePieData = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: dataAllTimeDate,
    isLoading: isLoadingDataAllTimeDate,
    isError: isErrorDataAllTimeDate
  } = useQuery(
    ['PieDataAllTimeDate', filters.date, filters.empIdField],
    () => dataService.fetchPieData(transformedFilters, 'PieDataAllTimeDate'),
    {
      enabled: !!filters?.empIdField && (!filters?.date || !filters?.date.length),
      refetchOnWindowFocus: false
    }
  );

  const {
    data: dataBeforeSelectedDate,
    isLoading: isLoadingDataBeforeSelectedDate,
    isError: isErrorDataBeforeSelectedDate
  } = useQuery(
    ['pieDataBeforeSelectedDate', filters.date, filters.empIdField],
    () =>
      dataService.fetchPieData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'PieDataBeforeSelectedDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: dataPrevDate,
    isLoading: isLoadingDataPrevDate,
    isError: isErrorDataPrevDate
  } = useQuery(
    ['pieDataPrevDate', filters.date, filters.empIdField],
    () =>
      dataService.fetchPieData(
        { ...transformedFilters, date: ['<=', filters.date[0].format('YYYY-MM-DD')] },
        'PieDataPrevDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField,
      refetchOnWindowFocus: false
    }
  );

  return {
    dataAllTimeDate,
    dataBeforeSelectedDate,
    dataPrevDate,

    isLoadingDataAllTimeDate,
    isLoadingDataBeforeSelectedDate,
    isLoadingDataPrevDate,

    isErrorDataAllTimeDate,
    isErrorDataBeforeSelectedDate,
    isErrorDataPrevDate
  };
};
