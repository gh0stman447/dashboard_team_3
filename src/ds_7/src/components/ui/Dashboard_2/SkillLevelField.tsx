import React, { FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import { skillLevels } from '../../../constants/Dashboard_2';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';

interface SkillLevelFieldProps extends InFormProps {
  skillLevels?: string[];
}
const SkillLevelField: FC<SkillLevelFieldProps> = ({ patchState }) => {
  const [skillLevel, setSkillLevel] = useState<string[]>([]);

  const handleChangeSkillLevel = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;
    const newSkillLevel = typeof value === 'string' ? value.split(',') : value;
    setSkillLevel(newSkillLevel);
    patchState({ skillLevel: newSkillLevel });
  };

  const initialSkillLevel = useDB2FiltersStore((state) => state.skillLevel);

  useEffect(() => {
    setSkillLevel(initialSkillLevel);
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="skillLevel-select">Уровень навыка</InputLabel>
      <Select
        id="skillLevel-select"
        multiple
        value={skillLevel}
        onChange={(e) => handleChangeSkillLevel(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {skillLevels.map((level) => (
          <MenuItem key={level} value={level}>
            <Checkbox checked={skillLevel.indexOf(level) > -1} />
            <ListItemText primary={level} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SkillLevelField;
