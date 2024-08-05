import { useQuery } from 'react-query';
import { dataService } from '../../../services/DataDboard_2.service';

export const useDevisionsData = () => {
  const {
    data: departments,
    isLoading: isLoadingDepartments,
    isError: isErrorDepartments
  } = useQuery('departments', () => dataService.fetchTextLetAllDepartmentsData('departments'), {
    refetchOnWindowFocus: false
  });

  return { departments, isLoadingDepartments, isErrorDepartments };
};
