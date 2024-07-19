import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { InFormProps } from '../../../types';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';

export interface SearchEmployeeFieldProps extends InFormProps {}

const SearchEmployeeField: FC<SearchEmployeeFieldProps> = ({ patchState }) => {
  const [empField, setEmpField] = useState<string>('');
  const initialEmpField = useDB1FiltersStore((state) => state.empField);

  useEffect(() => {
    setEmpField(initialEmpField);
  }, []);

  const handleChangeSearchField = (event: ChangeEvent<HTMLInputElement>) => {
    // setEmpField(event.target.value);
    // patchState({ empField });
    const newValue = event.target.value;
    setEmpField(newValue);
    patchState({ empField: newValue });
  };

  return (
    <>
      <p>Поиск сотрудника:</p>
      <input
        type="text"
        placeholder="ID или ФИО"
        className="border rounded-md px-2 py-3"
        onChange={(e) => handleChangeSearchField(e)}
        value={empField}
      />
    </>
  );
};

export default SearchEmployeeField;
