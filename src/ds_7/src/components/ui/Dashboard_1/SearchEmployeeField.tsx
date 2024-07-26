import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import { InFormProps } from '../../../types';
import { useQuery } from 'react-query';
import { dataService } from '../../../services/Data.service';

export interface SearchEmployeeFieldProps extends InFormProps {}

const SearchEmployeeField: React.FC<InFormProps> = ({ patchState }) => {
  const [empIdField, setEmpIdField] = useState<string>('');

  const { data, isLoading, isError } = useQuery([], () => dataService.fetchUsersIdData('usersId'));

  const empField = useDB1FiltersStore((state) => state.empIdField);

  useEffect(() => {
    setEmpIdField(empField);
  }, [empField]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleChangeSearchField = (value: string) => {
    setEmpIdField(value);
    patchState({ empIdField: value });
  };

  return (
    <div className="w-full">
      <p>Поиск сотрудника:</p>
      <Select
        className="w-full h-[50px] border border-black rounded-lg text-[30px]"
        showSearch
        allowClear
        optionFilterProp="label"
        filterSort={(optionA, optionB) => (optionA.value > optionB.value ? 1 : -1)}
        options={data}
        onChange={(value) => handleChangeSearchField(value)}
        value={empIdField || 'Выберите ID'}
      />
    </div>
  );
};

export default SearchEmployeeField;
