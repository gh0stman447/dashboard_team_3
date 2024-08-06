import React, { FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import { sortList } from '../../../utils/sortList';
import { useTypesOfSkill } from '../../../hooks/Dashboard_2';

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
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="typeOfSkills-select" sx={{ backgroundColor: 'white', px: '4px' }}>
        Типы навыков
      </InputLabel>
      <Select
        id="typeOfSkills-select"
        multiple
        value={typesOfSkill}
        onChange={(e) => handleChangeTypeOfSkill(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {sortedTypeOfSkills.map(({ skill_type }) => (
          <MenuItem key={skill_type} value={skill_type}>
            <Checkbox checked={typesOfSkill.indexOf(skill_type) > -1} />
            <ListItemText primary={skill_type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeOfSkillsField;
