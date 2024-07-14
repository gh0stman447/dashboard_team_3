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
      className="border border-white rounded-2xl"
      sx={{ border: '1px solid white', borderRadius: '5px' }}
    >
      {/* <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>
        Age
      </InputLabel> */}
      <SelectItem
        sx={{ color: 'white' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={(value) => handleAgeChange(value)}
      >
        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
        <MenuItem value={null}>Ничего</MenuItem>
        {SKILLS.map((skill) => (
          <MenuItem value={skill.value}>{skill.name}</MenuItem>
        ))}
      </SelectItem>
    </FormControl>
  );
};

export default Select;
