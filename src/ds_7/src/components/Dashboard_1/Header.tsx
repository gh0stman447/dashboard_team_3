import React from 'react';
import DialogSelect from '../ui/Dashboard_1/DialogSelect';
import BurgerMenu from '../ui/Dashboard_1/BurgerMenu';
import { NoFilter } from '../../../../assets/Dashboard_1/NoFilter';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import DisplayDate from '../ui/Dashboard_1/DisplayDate';

const Header = () => {
  const clearFilters = () => {
    useDB1FiltersStore.setState({ date: null, empIdField: '', typesOfSkill: [] });
  };

  const date = useDB1FiltersStore((state) => state.date);

  return (
    <header className="z-10 font-inter text-[20px] bg-gray-100 bg-navy py-3 px-8 flex justify-between items-center sticky h-[80px] top-0 border-b border-b-slate-400 border-l-0">
      <div className="flex gap-4 items-center grow justify-between ">
        <BurgerMenu />
        <p className="hidden lg:block">Статистика роста профессиональных компетенций сотрудника</p>
        <div className="flex items-center gap-4">
          <NoFilter
            height="32px"
            width="32px"
            onClick={clearFilters}
            className={
              'text-white cursor-pointer hover:text-gray hover:scale-125 duration-200 border rounded-md p-[3px]'
            }
          />
          <DialogSelect />
          <DisplayDate date={date} />
        </div>
      </div>
    </header>
  );
};

export default Header;
