import React, { FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import { skills } from '../../../constants/Dashboard_2';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';

const SkillsField = () => {
  const [skills, setSkills] = useState<string[]>([]);

  const initialSkills = useDB2FiltersStore((state) => state.skills);

  const handleChangeSkillLevel = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;

    useDB2FiltersStore.setState({ skills: value as string[] });
  };

  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 200,
        maxWidth: 300,
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
      }}
    >
      <InputLabel id="skills-select">Навыки</InputLabel>
      <Select
        id="skills-select"
        multiple
        value={skills}
        onChange={(e) => handleChangeSkillLevel(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {skills.map((level) => (
          <MenuItem key={level} value={level}>
            <Checkbox checked={skills.indexOf(level) > -1} />
            <ListItemText primary={level} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SkillsField;
