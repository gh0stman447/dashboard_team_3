import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectItem } from '@mui/material';
import React, { useState } from 'react';
import { SKILLS } from '../../constants/Dashboard_2';

const Select = () => {
  const [age, setAge] = useState(10);
  const handleAgeChange = (event: SelectChangeEvent<number>) => {
    setAge(event.target.value as number);
  };

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
        value={age}
        label="Age"
        onChange={(value) => handleAgeChange(value)}
      >
        <MenuItem value={''}>Ничего</MenuItem>
        {SKILLS.map((skill) => (
          <MenuItem value={skill.value}>{skill.name}</MenuItem>
        ))}
      </SelectItem>
    </FormControl>
  );
};

export default Select;
