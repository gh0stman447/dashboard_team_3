import * as React from 'react';
import Box from '@mui/material/Box';

import { useCallback, useRef } from 'react';
import SearchEmployeeField from '../ui/Dashboard_1/SearchEmployeeField';
import useDB1FiltersStore from '../../store/DB1FiltersStore';

import DateComponent from '../ui/DateComponent';
import TypeOfSkillField from '../ui/Dashboard_1/TypeOfSkillField';
import CustomFilterButton from '../ui/CustomFilterButton';
import ClearFiltersBtn from '../ui/ClearFiltersBtn';
import CustomForm from '../CustomForm';

const DialogSelect: React.FC = () => {
  const { setCurrentUserIndex, users } = useDB1FiltersStore((state) => ({
    setCurrentUserIndex: state.setCurrentUserIndex,
    users: state.users
  }));

  const currentFormStateRef = useRef<Record<string, any>>({}); // Храню состояние формы в ссылке. Так, оптимальнее

  // Метод обновления поля в форме
  const patchFormStateRef = useCallback((patch: Record<string, any>) => {
    currentFormStateRef.current = { ...currentFormStateRef.current, ...patch };
  }, []);

  const handleApplyFilters = () => {
    useDB1FiltersStore.setState(currentFormStateRef.current); // Сохраняю состояние формы в хранилище

    const empId = currentFormStateRef.current.empIdField;

    // В случае если выбран пользователь, делаю его текущим (для переключения между сотрудниками)
    if (empId) {
      const index = users.findIndex((user) => user.value === empId);

      if (index !== -1) {
        setCurrentUserIndex(index);
      }
    }
  };

  // Очищаю ссылку и глобальное состояние
  const clearFilters = () => {
    useDB1FiltersStore.setState({ date: null, empIdField: '', typesOfSkill: [] });
    currentFormStateRef.current = { date: null, empIdField: '', typesOfSkill: [] };
  };

  return (
    <CustomForm
      handler={handleApplyFilters}
      openBtn={<CustomFilterButton text="Фильтры" fontSize="13px" />}
      title="Фильтры"
    >
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <SearchEmployeeField patchState={patchFormStateRef} />
        <TypeOfSkillField patchState={patchFormStateRef} />
        <DateComponent patchState={patchFormStateRef} page="1" />
        <span className="mt-3 hover:scale-[1.05] duration-200 border border-black rounded-md p-[3px] w-fit">
          <ClearFiltersBtn text="Очистить фильтры" onClick={clearFilters} />
        </span>
      </Box>
    </CustomForm>
  );
};

export default DialogSelect;
