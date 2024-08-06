import { dataService } from '../../services/DataDboard_2.service';
import { useCustomQuery } from '../useCustomQuery';
import { ITextLetAllTypesOfSkillData } from '../../models';

export const useTypesOfSkill = () => {
  const {
    data: typesOfSkill,
    isLoading: isLoadingTypesOfSkill,
    isError: isErrorTypesOfSkill
  } = useCustomQuery<ITextLetAllTypesOfSkillData[]>('typesOfSkill', () =>
    dataService.fetchTextLetAllTypesOfSkillData('typesOfSkill')
  );

  return { typesOfSkill, isLoadingTypesOfSkill, isErrorTypesOfSkill };
};