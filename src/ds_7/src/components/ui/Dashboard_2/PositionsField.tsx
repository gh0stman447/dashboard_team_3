import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import { positions } from '../../../constants/Dashboard_2';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';

interface PositionFieldProps extends InFormProps {
  positions?: string[];
}

const PositionsField: FC<PositionFieldProps> = ({ patchState }) => {
  const [position, setPosition] = useState<string[]>([]);

  const handleChangePosition = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;
    const newPosition = typeof value === 'string' ? value.split(',') : value;
    setPosition(newPosition);
    patchState({ position: newPosition });
  };

  const initialPisition = useDB2FiltersStore((state) => state.position);

  useEffect(() => {
    setPosition(initialPisition);
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="position-select">Должность</InputLabel>
      <Select
        id="position-select"
        multiple
        value={position}
        onChange={(e) => handleChangePosition(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {positions.map((pos) => (
          <MenuItem key={pos} value={pos}>
            <Checkbox checked={position.indexOf(pos) > -1} />
            <ListItemText primary={pos} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PositionsField;
