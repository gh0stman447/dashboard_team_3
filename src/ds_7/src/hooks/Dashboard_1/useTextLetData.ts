import { transformFiltersFromDB1 } from '../../utils';
import { DB1FiltersStore } from '../../store/DB1FiltersStore';
import { dataService } from '../../services/DataDboard_1.service';
import { useCustomQuery } from '../useCustomQuery';
import { ITextLetData } from '../../models';

export const useTextLetData = (filters: Partial<DB1FiltersStore>) => {
  const transformedFilters = transformFiltersFromDB1(filters); // Преобразуем фильтры из стора в формат который необходим для запроса

  const {
    data: dataAllTimeDate,
    isLoading: isLoadingDataAllTimeDate,
    isError: isErrorDataAllTimeDate
  } = useCustomQuery<ITextLetData[]>(
    ['textLetDataAllTimeDate', filters],
    () => dataService.fetchTextLetData(transformedFilters, 'textLetDataAllTimeDate'),
    {
      enabled: !!filters.empIdField && !filters.date // Делаем запрос только в случае если в фильтрах есть поле empIdField и нет даты
    }
  );

  const {
    data: dataBeforeSelectedDate,
    isLoading: isLoadingDataBeforeSelectedDate,
    isError: isErrorDataBeforeSelectedDate
  } = useCustomQuery<ITextLetData[]>(
    ['textLetDataBeforeSelectedDate', filters],
    () =>
      dataService.fetchTextLetData(
        { ...transformedFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] }, // Берем данные на конец периода
        'TextLetDataBeforeSelectedDate'
      ),
    {
      enabled: !!filters?.date && !!filters?.empIdField // Делаем запрос только в случае если в фильтрах есть поле empIdField и есть дата
    }
  );

  const {
    data: dataPrevDate,
    isLoading: isLoadingDataPrevDate,
    isError: isErrorDataPrevDate
  } = useCustomQuery<ITextLetData[]>(
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
      enabled: !!filters?.date && !!filters?.empIdField
    }
  );

  const {
    data: skills,
    isLoading: isLoadingSkills,
    isError: isErrorSkills
  } = useCustomQuery<ITextLetData[]>(
    ['textLetDataSkills', filters],
    () => dataService.fetchTextLetDataSkills({ ...transformedFilters, skill_status: ['=', 'up'] }, 'TextLetDataSKills'),
    {
      enabled: !!filters?.empIdField && !!filters?.date
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
