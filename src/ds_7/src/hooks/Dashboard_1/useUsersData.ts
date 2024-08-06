import { IUserIdData } from '../../models';
import { dataService } from '../../services/DataDboard_1.service';
import { useCustomQuery } from '../useCustomQuery';

export const useUsersData = () => {
  const { data, isLoading, isError } = useCustomQuery<IUserIdData[]>(
    'usersId',
    () => dataService.fetchUsersIdData('usersId'),
    {}
  );
  return { data, isLoading, isError };
};