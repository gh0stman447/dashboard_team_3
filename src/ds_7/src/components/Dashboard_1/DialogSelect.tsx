import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useCallback, useRef } from 'react';
import SearchEmployeeField from '../ui/Dashboard_1/SearchEmployeeField';
import useDB1FiltersStore from '../../store/DB1FiltersStore';

import { Modal } from 'antd';
import DateComponent from '../ui/DateComponent';
import TypeOfSkillField from '../ui/Dashboard_1/TypeOfSkillField';
import CustomFilterButton from '../ui/CustomFilterButton';
import ClearFiltersBtn from '../ui/ClearFiltersBtn';

const DialogSelect: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const { setCurrentUserIndex, users } = useDB1FiltersStore((state) => ({
    setCurrentUserIndex: state.setCurrentUserIndex,
    users: state.users,
    
  }));

  const currentFormStateRef = useRef<Record<string, any>>({}); // Храню состояние формы в ссылке. Так, оптимальнее

  // Метод обновления поля в форме
  const patchFormStateRef = useCallback((patch: Record<string, any>) => {
    currentFormStateRef.current = { ...currentFormStateRef.current, ...patch };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleApplyFilters = () => {
    useDB1FiltersStore.setState(currentFormStateRef.current); // Сохраняю состояние формы в хранилище

    console.log(currentFormStateRef.current, 'currentFormStateRef.current');

    const empId = currentFormStateRef.current.empIdField;

    // В случае если выбран пользователь, делаю его текущим (для переключения между сотрудниками)
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

  // Очищаю ссылку и глобальное состояние
  const clearFilters = () => {
    useDB1FiltersStore.setState({ date: null, empIdField: '', typesOfSkill: [] });
    currentFormStateRef.current = { date: null, empIdField: '', typesOfSkill: [] };
  };

  return (
    <div>
      <CustomFilterButton handler={handleClickOpen} text="Фильтры" fontSize="13px" />
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
          <span className="mt-1 hover:scale-[1.05] duration-200 border border-black rounded-md p-[3px] w-fit">
            <ClearFiltersBtn text="Очистить фильтры" onClick={clearFilters} />
          </span>
        </Box>
      </Modal>
    </div>
  );
};

export default DialogSelect;
