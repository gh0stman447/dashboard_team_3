import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useState } from 'react';

interface DialogSelectProps {}
const DialogSelect: React.FC<DialogSelectProps> = () => {
  const [open, setOpen] = React.useState(false);

  const [yearLocalValue, setYearLocalValue] = useState<number>(null);
  const [country, setCountry] = useState<number | string>('');
  const [city] = useState<number | string>('');

  const handleChangeYear = (event: SelectChangeEvent<typeof yearLocalValue>) => {
    setYearLocalValue(event.target.value);
  };

  const handleChangeСountry = (event: SelectChangeEvent<typeof country>) => {
    setCountry(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleApplyFilters = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} className="" variant="outlined" color="inherit">
        Фильтры
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Выберите фильтры</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="year-select" htmlFor="year-select">
                Год
              </InputLabel>
              <Select
                id="demo-dialog-select"
                value={yearLocalValue}
                onChange={handleChangeYear}
                input={<OutlinedInput label="Year" />}
              >
                <MenuItem value={null}>
                  <em>Ничего</em>
                </MenuItem>
                {[2004, 2005, 2006, 2007].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="country-select">Страна</InputLabel>
              <Select
                id="demo-dialog-select"
                value={country}
                onChange={handleChangeСountry}
                input={<OutlinedInput label="country" id="country-select" />}
              >
                <MenuItem value={null}>
                  <em>Ничего</em>
                </MenuItem>
                {[{ customer_country: 'Russia' }, { customer_country: 'Клин' }]?.map(
                  ({ customer_country: country }) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApplyFilters}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogSelect;
