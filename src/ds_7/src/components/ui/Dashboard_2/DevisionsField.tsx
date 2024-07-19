import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { devisions } from '../../../constants/Dashboard_2';
import { InFormProps } from '../../../types';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';

interface DevisionFieldProps extends InFormProps {
  devisions?: string[];
}

const DevisionsField: FC<DevisionFieldProps> = ({ patchState }) => {
  const [devision, setDevision] = useState<string[]>([]);
  const handleChangeDevision = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;
    const newDevision = typeof value === 'string' ? value.split(',') : value;
    setDevision(newDevision);
    patchState({ devision: newDevision });
  };

  const initialDevision = useDB2FiltersStore((state) => state.devision);

  useEffect(() => {
    setDevision(initialDevision);
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="devision-select">Подразделение</InputLabel>
      <Select
        id="devision-select"
        multiple
        value={devision}
        onChange={(e) => handleChangeDevision(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {devisions.map((dev) => (
          <MenuItem key={dev} value={dev}>
            <Checkbox checked={devision.indexOf(dev) > -1} />
            <ListItemText primary={dev} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DevisionsField;
