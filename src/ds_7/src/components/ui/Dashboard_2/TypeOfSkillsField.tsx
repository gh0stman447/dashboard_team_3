import React, { FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import { typeOfSkills } from '../../../constants/Dashboard_2';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';

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
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="typeOfSkills-select">Типы навыков</InputLabel>
      <Select
        id="typeOfSkills-select"
        multiple
        value={typesOfSkill}
        onChange={(e) => handleChangeTypeOfSkill(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {typeOfSkills.map((type) => (
          <MenuItem key={type} value={type}>
            <Checkbox checked={typesOfSkill.indexOf(type) > -1} />
            <ListItemText primary={type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeOfSkillsField;
