import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../../services/DataDboard2.service';
import { sortList } from '../../../utils/sortList';

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

  const { data, isLoading, isError } = useQuery(
    'departments',
    () => dataService.fetchTextLetAllDepartmentsData('departments'),
    {
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    setDevision(initialDevision);
  }, [initialDevision]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const sortedDevisions = sortList(data, 'department');

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="devision-select">Подразделение</InputLabel>
      <Select
        id="devision-select"
        multiple
        value={devision}
        onChange={(e) => handleChangeDevision(e)}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {sortedDevisions.map(({ department }) => (
          <MenuItem key={department} value={department}>
            <Checkbox checked={devision.indexOf(department) > -1} />
            <ListItemText primary={department} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DevisionsField;
