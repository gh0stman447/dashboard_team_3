import React, { FC, useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import { sortList } from '../../../utils/sortList';
import { usePositionsData } from '../../../hooks/Dashboard_2';
import CustomMultipleSelect from '../../CustomMultipleSelect';

interface PositionFieldProps extends InFormProps {
  positions?: string[];
}

const PositionsField: FC<PositionFieldProps> = ({ patchState }) => {
  const [position, setPosition] = useState<string[]>([]);

  const { positions, isLoadingPositions, isErrorPositions } = usePositionsData();

  const handleChangePosition = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;

    const newPosition = typeof value === 'string' ? value.split(',') : value;

    setPosition(newPosition);
    patchState({ position: newPosition });
  };

  const initialPosition = useDB2FiltersStore((state) => state.position);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const statusMessage = isLoadingPositions ? 'Загрузка...' : isErrorPositions ? 'Ошибка' : undefined;

  if (statusMessage) {
    return <div>{statusMessage}</div>;
  }

  const sortedPositions = sortList(positions, 'job_title');

  return (
    <CustomMultipleSelect
      data={sortedPositions}
      localData={position}
      handler={(e) => handleChangePosition(e)}
      label="Должность"
      valueField="job_title"
    />
  );
};

export default PositionsField;
