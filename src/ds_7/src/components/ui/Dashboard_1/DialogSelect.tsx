import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useCallback, useRef, useEffect } from 'react';
import SearchEmployeeField from './SearchEmployeeField';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import CustomButton from '../CustomFilterButton';

import { Modal } from 'antd';
import DateComponent from '../DateComponent';
import TypeOfSkillField from './TypeOfSkillField';

const DialogSelect: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const date = useDB1FiltersStore((state) => state.date);

  const { setCurrentUserIndex, users } = useDB1FiltersStore((state) => ({
    setCurrentUserIndex: state.setCurrentUserIndex,
    users: state.users
  }));

  const currentFormStateRef = useRef<Record<string, any>>({});

  useEffect(() => {
    currentFormStateRef.current = useDB1FiltersStore.getState();
  }, [open]);

  const patchFormStateRef = useCallback((patch: Record<string, any>) => {
    currentFormStateRef.current = { ...currentFormStateRef.current, ...patch };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleApplyFilters = () => {
    useDB1FiltersStore.setState(currentFormStateRef.current);

    const empId = currentFormStateRef.current.empIdField;

    if (empId) {
      const index = users.findIndex((user) => user.value === empId);

      if (index !== -1) {
        setCurrentUserIndex(index);
      }
    }

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <CustomButton handler={handleClickOpen} text="Фильтры" fontSize="13px" />
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
            <p>Поиск сотрудника:</p>
            <SearchEmployeeField patchState={patchFormStateRef} />
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Фильтр по навыкам:</p>
            <TypeOfSkillField patchState={patchFormStateRef} />
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Выбор периода:</p>
            <DateComponent patchState={patchFormStateRef} page="1" />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DialogSelect;
