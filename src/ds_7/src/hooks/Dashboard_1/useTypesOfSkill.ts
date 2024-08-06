import { ITypesOfSkillData } from '../../models';
import { dataService } from '../../services/DataDboard_1.service';
import { useCustomQuery } from '../useCustomQuery';

export const useTypesOfSkill = () => {
  const {
    data: typesOfSkill,
    isLoading: isLoadingTypesOfSkill,
    isError: isErrorTypesOfSkill
  } = useCustomQuery<ITypesOfSkillData[]>('typesOfSkill', () => dataService.fetchTypeOfSkillsData('typesOfSkill'));

  return { typesOfSkill, isLoadingTypesOfSkill, isErrorTypesOfSkill };
};
