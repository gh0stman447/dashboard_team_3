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
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import DatePicker from '../DatePicker';
import CustomButton from '../CustomFilterButton';
import DateComponent from '../DateComponent';
import { Modal } from 'antd';

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

  const handleCancel = () => {
    setOpen(false);
  };

  const handleApplyFilters = () => {
    useDB2FiltersStore.getState().setFilters(currentFormStateRef.current);
    setOpen(false);
  };

  return (
    <>
      <CustomButton handler={handleClickOpen} text="Фильтры" />
      <Modal
        title="Title"
        open={open}
        onOk={handleApplyFilters}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Закрыть</Button>,
          <Button onClick={handleApplyFilters}>Применить</Button>
        ]}
      >
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <PositionsField patchState={patchFormStateRef} />
          <DevisionsField patchState={patchFormStateRef} />
          <TypeOfSkillsField patchState={patchFormStateRef} />
          <DateComponent patchState={patchFormStateRef} />
        </Box>
      </Modal>
    </>
  );
};

export default DialogSelect;
