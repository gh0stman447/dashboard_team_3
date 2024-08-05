import React from 'react';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { Activity } from '../../constants/Dashboard_1';
import { useEmployeeData } from '../hooks/Dashboard_1/useEmployeeData';

const SideBarRenderContent = () => {
  const empIdField = useDB1FiltersStore((state) => state.empIdField);

  const { empData, isLoadingEmpData, isErrorEmpData } = useEmployeeData(empIdField);

  if (isLoadingEmpData) {
    return <div>Загрузка...</div>;
  }

  if (isErrorEmpData) {
    return <div>Произошла ошибка</div>;
  }

  return empData ? (
    <>
      <p>ID сотрудника: {empData[0].employees_id}</p>
      <p>
        ФИО: {empData[0].first_name} {empData[0].last_name}
      </p>
      <p>Подразделение: {empData[0].department}</p>
      <p>Должность: {empData[0].job_title}</p>
      <p>
        Активность:{' '}
        {empData[0].activity === Activity.ACTIVE ? (
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
