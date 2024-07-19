import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FC, useState, useCallback, useRef } from 'react';
import PositionsField from './PositionsField';
import DevisionsField from './DevisionsField';
import TypeOfSkillsField from './TypeOfSkillsField';
import SkillLevelField from './SkillLevelField';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import DatePicker from '../DatePicker';
import CustomButton from '../CustomFilterButton';

interface DialogSelectProps {}
const DialogSelect: FC<DialogSelectProps> = () => {
  const [open, setOpen] = useState(false);

  const currentFormStateRef = useRef<Record<string, any>>({});

  const patchFormStateRef = useCallback((patch: Record<string, any>) => {
    currentFormStateRef.current = { ...currentFormStateRef.current, ...patch };
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
    useDB2FiltersStore.getState().setFilters(currentFormStateRef.current);
    setOpen(false);
  };

  return (
    <div>
      <CustomButton handler={handleClickOpen} text="Фильтры" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Выберите фильтры</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
            <PositionsField patchState={patchFormStateRef} />
            <DevisionsField patchState={patchFormStateRef} />
            <TypeOfSkillsField patchState={patchFormStateRef} />
            <SkillLevelField patchState={patchFormStateRef} />
            <DatePicker patchState={patchFormStateRef} />
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
