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
import CustomButton from '../CustomFilterButton';

import { Modal } from 'antd';
import DateComponent from '../DateComponent';

const DialogSelect: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const date = useDB1FiltersStore((state) => state.date);
  const currentFormStateRef2 = useRef<Record<string, any>>({});

  useEffect(() => {
    currentFormStateRef2.current = useDB1FiltersStore.getState();
    console.log(currentFormStateRef2.current, 'currentFormStateRef2.current');
  }, [open]);

  const patchFormStateRef2 = useCallback((patch: Record<string, any>) => {
    currentFormStateRef2.current = { ...currentFormStateRef2.current, ...patch };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleApplyFilters = () => {
    useDB1FiltersStore.setState(currentFormStateRef2.current);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <CustomButton handler={handleClickOpen} text="Фильтры" />
      <Modal
        open={open}
        onOk={handleApplyFilters}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Закрыть</Button>,
          <Button onClick={handleApplyFilters}>Применить</Button>
        ]}
      >
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '15px 5px' }}>
          <div className="flex flex-col gap-y-2">
            <SearchEmployeeField patchState={patchFormStateRef2} />
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Фильтр по навыкам:</p>
            <MySelect patchState={patchFormStateRef2} />
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Выбор периода:</p>
            {/* <DatePicker patchState={patchFormStateRef2} /> */}
            <DateComponent patchState={patchFormStateRef2} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DialogSelect;
