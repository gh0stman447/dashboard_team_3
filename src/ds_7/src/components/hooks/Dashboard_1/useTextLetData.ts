import { useQuery } from 'react-query';
import { transformFiltersFromDB1 } from '../../../utils';
import { dataService } from '../../../services/Data.service';
import { DB1FiltersStore } from '../../../store/DB1FiltersStore';

export const useTextLetData = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB1(filters);

  const {
    data: dataAllTimeDate,
    isLoading: isLoadingDataAllTimeDate,
    isError: isErrorDataAllTimeDate
  } = useQuery(
    ['textLetDataAllTimeDate', filters],
    () => dataService.fetchTextLetData(transformedFilters, 'textLetDataAllTimeDate'),
    {
      enabled: !!filters.empIdField && !filters.date,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: dataBeforeSelectedDate,
    isLoading: isLoadingDataBeforeSelectedDate,
    isError: isErrorDataBeforeSelectedDate
  } = useQuery(
    ['textLetDataBeforeSelectedDate', filters],
    () =>
      dataService.fetchTextLetData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'TextLetDataBeforeSelectedDate'
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
    ['textLetDataPrevDate', filters],
    () =>
      dataService.fetchTextLetData(
        {
          ...transformedFilters,
          date: ['<=', filters.date[0].format('YYYY-MM-DD')]
        },
        'TextLetDataPrevDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField,
      refetchOnWindowFocus: false
    }
  );

  const {
    data: skills,
    isLoading: isLoadingSkills,
    isError: isErrorSkills
  } = useQuery(
    ['textLetDataSkills', filters],
    () => dataService.fetchTextLetDataSkills({ ...transformedFilters, skill_status: ['=', 'up'] }, 'TextLetDataSKills'),
    {
      enabled: !!filters?.empIdField && !!filters?.date,
      refetchOnWindowFocus: false
    }
  );

  return {
    dataAllTimeDate,
    dataBeforeSelectedDate,
    dataPrevDate,

    isLoadingDataAllTimeDate,
    isLoadingDataPrevDate,
    isLoadingDataBeforeSelectedDate,

    isErrorDataAllTimeDate,
    isErrorDataPrevDate,
    isErrorDataBeforeSelectedDate,

    skills,
    isLoadingSkills,
    isErrorSkills
  };
};
