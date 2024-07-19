import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from '../DatePicker';
import MySelect from './TypeOfSkillField';
import { useCallback, useRef, useEffect, useState } from 'react';
import SearchEmployeeField from './SearchEmployeeField';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import CustomButton from '../CustomButton';

const DialogSelect: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const currentFormStateRef2 = useRef<Record<string, any>>({});

  const patchFormStateRef2 = useCallback((patch: Record<string, any>) => {
    currentFormStateRef2.current = { ...currentFormStateRef2.current, ...patch };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleApplyFilters = () => {
    useDB1FiltersStore.getState().setFilters(currentFormStateRef2.current);
    console.log(currentFormStateRef2.current);
    setOpen(false);
  };

  return (
    <div>
      <CustomButton handler={handleClickOpen} text="Фильтры" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Выберите фильтры</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="flex flex-col gap-y-2">
              <SearchEmployeeField patchState={patchFormStateRef2} />
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Фильтр по навыкам:</p>
              <MySelect patchState={patchFormStateRef2} />
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Выбор периода:</p>
              <DatePicker patchState={patchFormStateRef2} />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={handleApplyFilters}>Применить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogSelect;
