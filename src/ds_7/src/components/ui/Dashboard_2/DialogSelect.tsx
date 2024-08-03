import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FC, useState, useCallback, useRef } from 'react';
import PositionsField from './PositionsField';
import DevisionsField from './DevisionsField';
import TypeOfSkillsField from './TypeOfSkillsField';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import DateComponent from '../DateComponent';
import { Modal } from 'antd';
import { useEffect } from 'react';
import CustomFilterButton from '../CustomFilterButton';

interface DialogSelectProps {}
const DialogSelect: FC<DialogSelectProps> = () => {
  const [open, setOpen] = useState(false);

  const currentFormStateRef = useRef<Record<string, any>>({});

  // useEffect(() => {
  //   currentFormStateRef.current = useDB2FiltersStore.getState();
  //   console.log(currentFormStateRef.current);
  // }, [open]);

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
    console.log(currentFormStateRef.current);
    useDB2FiltersStore.setState(currentFormStateRef.current);
    setOpen(false);
  };

  const clearFilters = () => {
    useDB2FiltersStore.setState({ date: null, position: [], typesOfSkill: [], devision: [] });
    currentFormStateRef.current = { date: null, position: [], typesOfSkill: [], devision: [] };
  };

  return (
    <>
      <CustomFilterButton handler={handleClickOpen} text="Фильтры" fontSize="13px" />
      <Modal
        title="Фильтры"
        open={open}
        onOk={handleApplyFilters}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Закрыть</Button>,
          <Button onClick={handleApplyFilters}>Применить</Button>
        ]}
      >
        {open && (
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <PositionsField patchState={patchFormStateRef} />
            <DevisionsField patchState={patchFormStateRef} />
            <TypeOfSkillsField patchState={patchFormStateRef} />
            <DateComponent patchState={patchFormStateRef} />
            <span className="mt-1 hover:scale-[1.05] duration-200 border border-black rounded-md p-[3px] w-fit">
              <Button
                onClick={clearFilters}
                sx={{
                  padding: '5px 10px'
                }}
              >
                Очистить фильтры
              </Button>
            </span>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default DialogSelect;
