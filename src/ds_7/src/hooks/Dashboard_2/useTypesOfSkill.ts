import { useQuery } from 'react-query';
import { dataService } from '../../services/DataDboard_2.service';

export const useTypesOfSkill = () => {
  const {
    data: typesOfSkill,
    isLoading: isLoadingTypesOfSkill,
    isError: isErrorTypesOfSkill
  } = useQuery('typesOfSkill', () => dataService.fetchTextLetAllTypesOfSkillData('typesOfSkill'), {
    refetchOnWindowFocus: false
  });

  return { typesOfSkill, isLoadingTypesOfSkill, isErrorTypesOfSkill };
};
