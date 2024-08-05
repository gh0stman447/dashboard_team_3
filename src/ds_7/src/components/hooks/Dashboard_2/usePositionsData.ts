import { useQuery } from 'react-query';
import { dataService } from '../../../services/DataDboard_2.service';

export const usePositionsData = () => {
  const {
    data: positions,
    isLoading: isLoadingPositions,
    isError: isErrorPositions
  } = useQuery('positions', () => dataService.fetchTextLetAllPositionsData('positions'), {
    refetchOnWindowFocus: false
  });

  return { positions, isLoadingPositions, isErrorPositions };
};
