import React, { FC, useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import { sortList } from '../../../utils/sortList';
import { useTypesOfSkill } from '../../../hooks/Dashboard_2';
import CustomMultipleSelect from '../../CustomMultipleSelect';

interface TypeOfSkillFieldProps extends InFormProps {
  typeOfSkills?: string[];
}

const TypeOfSkillsField: FC<TypeOfSkillFieldProps> = ({ patchState }) => {
  const [typesOfSkill, setTypeOfSkill] = useState<string[]>([]);
  const handleChangeTypeOfSkill = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;

    const newTypesOfSkill = typeof value === 'string' ? value.split(',') : value;

    setTypeOfSkill(newTypesOfSkill);

    patchState({ typesOfSkill: newTypesOfSkill });
  };

  const initialTypeOfSkill = useDB2FiltersStore((state) => state.typesOfSkill);

  useEffect(() => {
    setTypeOfSkill(initialTypeOfSkill);
  }, [initialTypeOfSkill]);

  const { typesOfSkill: typesOfSkillData, isLoadingTypesOfSkill, isErrorTypesOfSkill } = useTypesOfSkill();
  const statusMessage = isLoadingTypesOfSkill ? 'Загрузка...' : isErrorTypesOfSkill ? 'Ошибка' : undefined;

  if (statusMessage) {
    return <div>{statusMessage}</div>;
  }
  const sortedTypeOfSkills = sortList(typesOfSkillData, 'skill_type');

  return (
    <CustomMultipleSelect
      data={sortedTypeOfSkills}
      localData={typesOfSkill}
      handler={handleChangeTypeOfSkill}
      label="Тип навыка"
      valueField={'skill_type'}
    />
  );
};

export default TypeOfSkillsField;
