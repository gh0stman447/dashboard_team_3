import { useQuery } from 'react-query';
import { transformFiltersFromDB1 } from '../../utils';
import { dataService } from '../../services/DataDboard_1.service';

export const useEmployeeData = (empIdField: string) => {
  const transformedFilters = transformFiltersFromDB1({ empIdField });

  const {
    data: empData,
    isLoading: isLoadingEmpData,
    isError: isErrorEmpData
  } = useQuery(['empIdField', empIdField], () => dataService.fetchUserData(transformedFilters, 'empIdField'), {
    enabled: !!empIdField, // Делаем запрос только в том случае, если поле сотрудника выбрано
    refetchOnWindowFocus: false // Отключаем refetch при потере фокуса
  });

  return { empData, isLoadingEmpData, isErrorEmpData };
};
