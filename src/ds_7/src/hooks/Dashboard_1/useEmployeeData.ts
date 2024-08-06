import { transformFiltersFromDB1 } from '../../utils';
import { dataService } from '../../services/DataDboard_1.service';
import { useCustomQuery } from '../useCustomQuery';
import { IUserData } from '../../models';

export const useEmployeeData = (empIdField: string) => {
  const transformedFilters = transformFiltersFromDB1({ empIdField });

  const {
    data: empData,
    isLoading: isLoadingEmpData,
    isError: isErrorEmpData
  } = useCustomQuery<IUserData[]>(
    ['empIdField', empIdField],
    () => dataService.fetchUserData(transformedFilters, 'empIdField'),
    {
      enabled: !!empIdField // Делаем запрос только в том случае, если поле сотрудника выбрано
    }
  );

  return { empData, isLoadingEmpData, isErrorEmpData };
};
