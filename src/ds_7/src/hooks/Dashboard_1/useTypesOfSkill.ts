import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard_1.service';

export const useTypesOfSkill = () => {
  const {
    data: typesOfSkill,
    isLoading: isLoadingTypesOfSkill,
    isError: isErrorTypesOfSkill
  } = useQuery('typesOfSkill', () => dataService.fetchTypeOfSkillsData('typesOfSkill'), {
    refetchOnWindowFocus: false
  });

  return { typesOfSkill, isLoadingTypesOfSkill, isErrorTypesOfSkill };
};
