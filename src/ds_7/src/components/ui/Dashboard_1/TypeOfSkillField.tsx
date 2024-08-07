import React, { FC, useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { InFormProps } from '../../../types';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import { useTypesOfSkill } from '../../../hooks/Dashboard_1';
import CustomMultipleSelect from '../../CustomMultipleSelect';

interface PositionFieldProps extends InFormProps {}

const TypeOfSkillField: FC<PositionFieldProps> = ({ patchState }) => {
  const [typesOfSkill, setTypesOfSkill] = useState<string[]>([]);

  const handleChangePosition = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;

    const newTypesOfSkill = typeof value === 'string' ? value.split(',') : value;

    setTypesOfSkill(newTypesOfSkill);
    patchState({ typesOfSkill: newTypesOfSkill });
  };

  const initialTypesOfSkill = useDB1FiltersStore((state) => state.typesOfSkill);

  const { typesOfSkill: typesOfSkillData, isLoadingTypesOfSkill, isErrorTypesOfSkill } = useTypesOfSkill();

  useEffect(() => {
    setTypesOfSkill(initialTypesOfSkill);
  }, [initialTypesOfSkill]);

  const statusMessage = isLoadingTypesOfSkill ? (
    <div>'Загрузка...'</div>
  ) : isErrorTypesOfSkill ? (
    <div>'Ошибка'</div>
  ) : undefined;

  if (statusMessage) {
    return <p className="text-center p-4">{statusMessage}</p>;
  }

  return (
    <>
      <CustomMultipleSelect
        data={typesOfSkillData}
        localData={typesOfSkill}
        handler={(e) => handleChangePosition(e)}
        label="Тип навыка"
        valueField={'skill_type'}
      />
    </>
  );
};

export default TypeOfSkillField;
