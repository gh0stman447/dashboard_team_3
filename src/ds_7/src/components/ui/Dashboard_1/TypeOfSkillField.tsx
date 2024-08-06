import React, { FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import { InFormProps } from '../../../types';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import { useTypesOfSkill } from '../../../hooks/Dashboard_1';

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

  if (isLoadingTypesOfSkill) {
    return <div>Загрузка...</div>;
  }

  if (isErrorTypesOfSkill) {
    return <div>Ошибка</div>;
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="position-select" sx={{ backgroundColor: 'white', px: '4px' }}>
        Тип навыка
      </InputLabel>
      <Select
        id="position-select"
        multiple
        value={typesOfSkill}
        onChange={(e) => handleChangePosition(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {typesOfSkillData.map(({ skill_type }) => (
          <MenuItem key={skill_type} value={skill_type}>
            <Checkbox checked={typesOfSkill.indexOf(skill_type) > -1} />
            <ListItemText primary={skill_type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeOfSkillField;
