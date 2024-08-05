import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import { sortList } from '../../../utils';
import { useDevisionsData } from '../../hooks/Dashboard_2';

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

  const { departments, isLoadingDepartments, isErrorDepartments } = useDevisionsData();

  useEffect(() => {
    setDevision(initialDevision);
  }, [initialDevision]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        maxWidth: 300
      }
    }
  };

  if (isLoadingDepartments) {
    return <div>Загрузка...</div>;
  }

  if (isErrorDepartments) {
    return <div>Ошибка</div>;
  }

  const sortedDevisions = sortList(departments, 'department');

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="devision-select" sx={{ backgroundColor: 'white', px: '4px' }}>
        Подразделение
      </InputLabel>
      <Select
        id="devision-select"
        multiple
        value={devision}
        onChange={(e) => handleChangeDevision(e)}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {sortedDevisions.map(({ department }) => (
          <MenuItem key={department} value={department} sx={{ whiteSpace: 'normal' }}>
            <Checkbox checked={devision.indexOf(department) > -1} />
            <ListItemText primary={department} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DevisionsField;
