import React from 'react';
import DialogSelect from '../ui/Dashboard_2/DialogSelect';
import { Logo } from '../../../../assets/Dashboard_1';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { NoFilter } from '../../../../assets/Dashboard_1/NoFilter';
import DisplayDate from '../ui/Dashboard_1/DisplayDate';

const Header = () => {
  const clearFilters = () => {
    useDB2FiltersStore.setState({ date: null, position: [], typesOfSkill: [], devision: [] });
  };

  const date = useDB2FiltersStore((state) => state.date);
  return (
    <header className="z-10 font-inter text-[20px] bg-gray-100 bg-navy flex p-[10px] px-[20px] justify-between items-center sticky h-[80px] top-0 border-b border-b-slate-400 border-l-0 dark:border-slate-600">
      <Logo />
      <div className="hidden xl:block">
        <p>Статистика роста профессиональных компетенций сотрудников в ДАР</p>
      </div>
      <div className="flex items-center gap-4">
        <NoFilter
          height="32px"
          width="32px"
          onClick={clearFilters}
          className={'text-white cursor-pointer hover:text-gray hover:scale-125 duration-200 border rounded-md p-[3px]'}
        />
        <DialogSelect />
        <DisplayDate date={date} />
      </div>
    </header>
  );
};

export default Header;
