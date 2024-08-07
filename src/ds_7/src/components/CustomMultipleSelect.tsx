import React, { CSSProperties } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

interface CustomMultipleSelectProps<T> {
  data: T[];
  localData: string[];
  handler: (event: any) => void;
  label: string;
  valueField: keyof T;
  formControlStyles?: CSSProperties;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      maxWidth: 300
    }
  }
};

const CustomMultipleSelect = <T,>({
  data,
  localData,
  handler,
  label,
  valueField,
  formControlStyles = {}
}: CustomMultipleSelectProps<T>) => {
  return (
    <FormControl sx={{ minWidth: 120, ...formControlStyles }}>
      <InputLabel sx={{ backgroundColor: 'white', px: '4px' }}>{label}</InputLabel>
      <Select
        multiple
        value={localData}
        onChange={handler}
        renderValue={(selected) => (selected as string[]).join(', ')}
        MenuProps={MenuProps}
      >
        {data.map((item, index) => {
          const value = item[valueField] as string;

          return (
            <MenuItem key={index} value={value} sx={{ whiteSpace: 'normal' }}>
              <Checkbox checked={localData.indexOf(value) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomMultipleSelect;
