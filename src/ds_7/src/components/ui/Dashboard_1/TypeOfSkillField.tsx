import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectItem } from '@mui/material';
import { SKILLS } from '../../../constants/Dashboard_2';
import { InFormProps } from '../../../types';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';

interface MySelectProps extends InFormProps {
  typeOfSkills?: string[];
}

const TypeOfSkillField: React.FC<MySelectProps> = ({ patchState }) => {
  const [typeOfSkill, setTypeOfSkill] = useState<string>('');
  const handleChangeTypeOfSkill = (event: SelectChangeEvent<string>) => {
    const {
      target: { value }
    } = event;

    setTypeOfSkill(value);
    patchState({ typeOfSkill: value });
  };

  const initialTypeOfSkill = useDB1FiltersStore((state) => state.typeOfSkill);

  useEffect(() => {
    setTypeOfSkill(initialTypeOfSkill);
  }, []);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      color="success"
      className="border border-white rounded-md"
      sx={{ border: '1px solid black', backgroundColor: 'white' }}
    >
      <InputLabel id="demo-simple-select-label" sx={{ color: 'black' }}>
        Навыки
      </InputLabel>
      <SelectItem
        sx={{ color: 'black' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={typeOfSkill}
        label="Skill"
        onChange={handleChangeTypeOfSkill}
      >
        <MenuItem value={''}>Ничего</MenuItem>
        {SKILLS.map((skill) => (
          <MenuItem key={skill.name} value={skill.name}>
            {skill.name}
          </MenuItem>
        ))}
      </SelectItem>
    </FormControl>
  );
};

export default TypeOfSkillField;
