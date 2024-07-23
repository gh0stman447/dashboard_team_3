import React from 'react';
import { Logo } from '../../../../assets/Dashboard_1';
import { Avatar } from '@mui/material';
import { useQuery } from 'react-query';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { dataService } from '../../services/Data.service';
import useUiStore from '../../store/uiStore';
import { transformFiltersFromDB1 } from '../../utils';

const SideBar = () => {
  const isOpen = useUiStore((state) => state.isSidebarOpen);
  const empIdField = useDB1FiltersStore((state) => state.empIdField);

  const transformedFilters = transformFiltersFromDB1({ empIdField });

  const { data, isLoading, isError } = useQuery(
    ['empIdField', empIdField],
    () => dataService.fetchUserData(transformedFilters, 'empIdField'),
    {
      enabled: !!empIdField
    }
  );

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (isError) {
    return <div>Произошла ошибка</div>;
  }

  return (
    <aside
      className={`font-inter text-white overflow-y-scroll bg-gray-100 bg-navy min-w-[325px] w-[325px] h-screen 4xl:h-auto fixed 2xl:sticky top-0 z-30 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } 2xl:translate-x-0 border-r border-r-slate-400`}
    >
      <div className="mt-[5px]">
        <Logo />
      </div>
      <div className="flex flex-col p-5">
        <p className="text-[26px] self-start">Статистика роста профессиональных компетенций сотрудника</p>
        <div className="flex justify-center rounded-full my-[50px]">
          <Avatar sx={{ width: 250, height: 250 }} />
        </div>
        {data && (
          <div className="">
            <p>Общая Информация о Сотруднике:</p>
            <p>ID сотрудника: {data[0].employees_id}</p>
            <p>
              ФИО: {data[0].first_name} {data[0].last_name}
            </p>
            <p>Подразделение: {data[0].department}</p>
            <p>Должность: {data[0].job_title}</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
