import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FC, useState, useCallback, useRef } from 'react';
import PositionsField from '../ui/Dashboard_2/PositionsField';
import DevisionsField from '../ui/Dashboard_2/DevisionsField';
import TypeOfSkillsField from '../ui/Dashboard_2/TypeOfSkillsField';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import DateComponent from '../ui/DateComponent';
import { Modal } from 'antd';
import CustomFilterButton from '../ui/CustomFilterButton';
import ClearFiltersBtn from '../ui/ClearFiltersBtn';
import CustomDialogSelect from '../CustomDialogSelect';

const DialogSelect: FC = () => {
  const currentFormStateRef = useRef<Record<string, any>>({});

  const patchFormStateRef = useCallback((patch: Record<string, any>) => {
    currentFormStateRef.current = { ...currentFormStateRef.current, ...patch };
  }, []);

  const handleApplyFilters = () => {
    useDB2FiltersStore.setState(currentFormStateRef.current);
  };

  const clearFilters = () => {
    useDB2FiltersStore.setState({ date: null, position: [], typesOfSkill: [], devision: [] });
    currentFormStateRef.current = { date: null, position: [], typesOfSkill: [], devision: [] };
  };

  return (
    <>
      <CustomDialogSelect
        handler={handleApplyFilters}
        openBtn={<CustomFilterButton text="Фильтры" fontSize="13px" />}
        title="Фильтры"
      >
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <PositionsField patchState={patchFormStateRef} />
          <DevisionsField patchState={patchFormStateRef} />
          <TypeOfSkillsField patchState={patchFormStateRef} />
          <DateComponent patchState={patchFormStateRef} />
          <span className="mt-1 hover:scale-[1.05] duration-200 border border-black rounded-md p-[3px] w-fit">
            <ClearFiltersBtn text="Очистить фильтры" onClick={clearFilters} />
          </span>
        </Box>
      </CustomDialogSelect>
    </>
  );
};

export default DialogSelect;
