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
import { usePositionsData } from '../../hooks/Dashboard_2';

interface PositionFieldProps extends InFormProps {
  positions?: string[];
}

const PositionsField: FC<PositionFieldProps> = ({ patchState }) => {
  const [position, setPosition] = useState<string[]>([]);

  const { positions, isLoadingPositions, isErrorPositions } = usePositionsData();

  const handleChangePosition = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;
    const newPosition = typeof value === 'string' ? value.split(',') : value;
    setPosition(newPosition);
    patchState({ position: newPosition });
  };

  const initialPosition = useDB2FiltersStore((state) => state.position);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const statusMessage = isLoadingPositions ? 'Загрузка...' : isErrorPositions ? 'Ошибка' : undefined;

  if (statusMessage) {
    return <div>{statusMessage}</div>;
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        maxWidth: 200
      }
    }
  };

  const sortedPositions = sortList(positions, 'job_title');

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="position-select" sx={{ backgroundColor: 'white', px: '4px' }}>
        Должность
      </InputLabel>
      <Select
        id="position-select"
        multiple
        value={position}
        onChange={(e) => handleChangePosition(e)}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {sortedPositions.map(({ job_title }) => (
          <MenuItem key={job_title} value={job_title}>
            <Checkbox checked={position.indexOf(job_title) > -1} />
            <ListItemText primary={job_title} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PositionsField;
