import React from 'react';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { Activity } from '../../constants/Dashboard_1';
import { useEmployeeData } from '../../hooks/Dashboard_1';

const SideBarRenderContent = () => {
  const empIdField = useDB1FiltersStore((state) => state.empIdField);

  const { empData, isLoadingEmpData, isErrorEmpData } = useEmployeeData(empIdField);

  const statusMessage = !empIdField
    ? 'Выберите сотрудника'
    : isLoadingEmpData
    ? 'Загрузка...'
    : isErrorEmpData
    ? 'Oшибка'
    : undefined;

  if (statusMessage) {
    return <p className="text-center p-4">{statusMessage}</p>;
  }

  const { activity, department, employees_id, first_name, job_title, last_name } = empData[0];

  return (
    <>
      <p>ID сотрудника: {employees_id}</p>
      <p>
        ФИО: {first_name} {last_name}
      </p>
      <p>Подразделение: {department}</p>
      <p>Должность: {job_title}</p>
      <p>
        Активность:{' '}
        {activity === Activity.ACTIVE ? (
          <span className="text-green">Активен</span>
        ) : (
          <span className="text-red"> Уволен</span>
        )}
      </p>
    </>
  );
};

export default SideBarRenderContent;
