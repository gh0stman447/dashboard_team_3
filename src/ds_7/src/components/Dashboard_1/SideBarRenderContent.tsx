import React from 'react';
import { useQuery } from 'react-query';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { dataService } from '../../services/Data.service';
import { transformFiltersFromDB1 } from '../../utils';

const SideBarRenderContent = () => {
  const empIdField = useDB1FiltersStore((state) => state.empIdField);

  const transformedFilters = transformFiltersFromDB1({ empIdField });

  enum Activity {
    active = 'Да',
    notActive = 'Нет'
  }

  const { data, isLoading, isError } = useQuery(
    ['empIdField', empIdField],
    () => dataService.fetchUserData(transformedFilters, 'empIdField'),
    {
      enabled: !!empIdField,
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (isError) {
    return <div>Произошла ошибка</div>;
  }

  console.log(data);
  return data ? (
    <>
      {' '}
      <p>ID сотрудника: {data[0].employees_id}</p>
      <p>
        ФИО: {data[0].first_name} {data[0].last_name}
      </p>
      <p>Подразделение: {data[0].department}</p>
      <p>Должность: {data[0].job_title}</p>
      <p>
        Активность:{' '}
        {data[0].activity === Activity.active ? (
          <span className="text-green">Активен</span>
        ) : (
          <span className="text-red"> Уволен</span>
        )}
      </p>
    </>
  ) : (
    <p className="text-center p-4">(Не выбран сотрудник)</p>
  );
};

export default SideBarRenderContent;
