import { dataService } from '../../services/DataDboard_2.service';
import { useCustomQuery } from '../useCustomQuery';
import { IAllPositionsData } from '../../models';

export const usePositionsData = () => {
  const {
    data: positions,
    isLoading: isLoadingPositions,
    isError: isErrorPositions
  } = useCustomQuery<IAllPositionsData[]>('positions', () => dataService.fetchTextLetAllPositionsData('positions'));

  return { positions, isLoadingPositions, isErrorPositions };
};
