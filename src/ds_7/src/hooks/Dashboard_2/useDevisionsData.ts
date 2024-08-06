import { dataService } from '../../services/DataDboard_2.service';
import { useCustomQuery } from '../useCustomQuery';
import { IAllDepartmentsData } from '../../models';

export const useDevisionsData = () => {
  const {
    data: departments,
    isLoading: isLoadingDepartments,
    isError: isErrorDepartments
  } = useCustomQuery<IAllDepartmentsData[]>('departments', () =>
    dataService.fetchTextLetAllDepartmentsData('departments')
  );

  return { departments, isLoadingDepartments, isErrorDepartments };
};
