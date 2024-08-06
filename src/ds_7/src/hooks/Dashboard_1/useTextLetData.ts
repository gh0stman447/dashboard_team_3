import { useQuery } from 'react-query';
import { transformFiltersFromDB1 } from '../../utils';
import { DB1FiltersStore } from '../../store/DB1FiltersStore';
import { dataService } from '../../services/DataDboard_1.service';

export const useTextLetData = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB1(filters); // Преобразуем фильтры из стора в формат который необходим для запроса

  const {
    data: dataAllTimeDate,
    isLoading: isLoadingDataAllTimeDate,
    isError: isErrorDataAllTimeDate
  } = useQuery(
    ['textLetDataAllTimeDate', filters],
    () => dataService.fetchTextLetData(transformedFilters, 'textLetDataAllTimeDate'),
    {
      enabled: !!filters.empIdField && !filters.date, // Делаем запрос только в случае если в фильтрах есть поле empIdField и нет даты
      refetchOnWindowFocus: false // Отключаем повторный запрос при анфокусе
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
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] }, // Берем данные на конец периода
        'TextLetDataBeforeSelectedDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField, // Делаем запрос только в случае если в фильтрах есть поле empIdField и есть дата
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
          date: ['<=', filters.date[0].format('YYYY-MM-DD')] // Берем данные на начало периода
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
    skills,

    isLoading: isLoadingDataAllTimeDate || isLoadingDataPrevDate || isLoadingDataBeforeSelectedDate || isLoadingSkills,
    isError: isErrorDataAllTimeDate || isErrorDataPrevDate || isErrorDataBeforeSelectedDate || isErrorSkills
  };
};
