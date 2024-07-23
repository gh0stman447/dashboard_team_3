import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { InFormProps } from '../../../types';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';

export interface SearchEmployeeFieldProps extends InFormProps {}

const SearchEmployeeField: FC<SearchEmployeeFieldProps> = ({ patchState }) => {
  const [empIdField, setEmpIdField] = useState<string>('');
  const initialEmpIdField = useDB1FiltersStore((state) => state.empIdField);

  useEffect(() => {
    setEmpIdField(initialEmpIdField);
  }, [initialEmpIdField]);

  const handleChangeSearchField = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEmpIdField(newValue);

    const numericValue = parseInt(newValue, 10);
    if (!isNaN(numericValue)) {
      patchState({ empIdField: numericValue });
    } else {
      patchState({ empIdField: null });
    }
  };

  return (
    <>
      <p>Поиск сотрудника:</p>
      <input
        type="text"
        placeholder="ID или ФИО"
        className="border rounded-md px-2 py-3"
        onChange={(e) => handleChangeSearchField(e)}
        value={empIdField}
      />
    </>
  );
};

export default SearchEmployeeField;
