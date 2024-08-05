import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import { InFormProps } from '../../../types';
import { useQuery } from 'react-query';
import { dataService } from '../../../services/DataDboard_1.service';

export interface SearchEmployeeFieldProps extends InFormProps {}

const SearchEmployeeField: React.FC<InFormProps> = ({ patchState }) => {
  const [empIdField, setEmpIdField] = useState<string>('');

  const empField = useDB1FiltersStore((state) => state.empIdField); // Беру значение из хранилища и присваиваю его в стейт

  const users = useDB1FiltersStore((state) => state.users);

  useEffect(() => {
    setEmpIdField(empField);
  }, [empField]);

  const handleChangeSearchField = (value: string) => {
    setEmpIdField(value);
    patchState({ empIdField: value });
  };

  return (
    <div className="w-full">
      <Select
        className="w-full h-[50px] border border-black rounded-lg text-[30px]"
        showSearch
        allowClear
        optionFilterProp="label"
        filterSort={(optionA, optionB) => (optionA.value > optionB.value ? 1 : -1)}
        options={users}
        onChange={(value) => handleChangeSearchField(value)}
        value={empIdField || 'Выберите ID'}
      />
    </div>
  );
};

export default SearchEmployeeField;
