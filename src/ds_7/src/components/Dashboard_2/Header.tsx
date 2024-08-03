import React from 'react';
import DialogSelect from '../ui/Dashboard_2/DialogSelect';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import { NoFilter } from '../../../../assets/Dashboard_1/NoFilter';
import DisplayDate from '../ui/Dashboard_1/DisplayDate';
import DarLogo from '../ui/DarLogo';

const Header = () => {
  const clearFilters = () => {
    useDB2FiltersStore.setState({ date: null, position: [], typesOfSkill: [], devision: [] });
  };

  const date = useDB2FiltersStore((state) => state.date);
  return (
    <header className="z-10 font-inter text-[15px] bg-gray-100 flex py-4 px-5 justify-between items-center sticky h-[70px] top-0">
      <span className="-mt-[4px]">
        <DarLogo height="60px" width="60px" />
      </span>
      <div className="hidden md-lg:block">
        <p className="">Статистика роста профессиональных компетенций сотрудников в ДАР</p>
      </div>
      <div className="flex items-center gap-2">
        {/* <NoFilter
          height="23px"
          width="23px"
          onClick={clearFilters}
          className={'text-black cursor-pointer hover:scale-125 duration-200 border rounded-md p-[3px]'}
        /> */}
        <DialogSelect />
        <DisplayDate date={date} />
      </div>
    </header>
  );
};

export default Header;
