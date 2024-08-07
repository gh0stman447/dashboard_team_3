import { SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import { sortList } from '../../../utils';
import { useDevisionsData } from '../../../hooks/Dashboard_2';
import CustomMultipleSelect from '../../CustomMultipleSelect';

interface DevisionFieldProps extends InFormProps {
  devisions?: string[];
}

const DevisionsField: FC<DevisionFieldProps> = ({ patchState }) => {
  const [devision, setDevision] = useState<string[]>([]);

  const handleChangeDevision = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;
    const newDevision = typeof value === 'string' ? value.split(',') : value;
    setDevision(newDevision);
    patchState({ devision: newDevision });
  };

  const initialDevision = useDB2FiltersStore((state) => state.devision);

  const { departments, isLoadingDepartments, isErrorDepartments } = useDevisionsData();

  useEffect(() => {
    setDevision(initialDevision);
  }, [initialDevision]);

  const statusMessage = isLoadingDepartments ? 'Загрузка...' : isErrorDepartments ? 'Ошибка' : undefined;

  if (statusMessage) {
    return <div>{statusMessage}</div>;
  }

  const sortedDevisions = sortList(departments, 'department');

  return (
    <CustomMultipleSelect
      data={sortedDevisions}
      localData={devision}
      handler={(e) => handleChangeDevision(e)}
      label="Подразделение"
      valueField={'department'}
    />
  );
};

export default DevisionsField;
