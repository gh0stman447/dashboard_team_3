import React from 'react';
import DialogSelect from './DialogSelect';
import BurgerMenu from '../ui/Dashboard_1/BurgerMenu';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import DisplayDate from '../ui/Dashboard_1/DisplayDate';

const Header = () => {
  const date = useDB1FiltersStore((state) => state.date);

  return (
    <header className="z-10 bg-sky-blue shadow-sm font-inter text-[15px] bg-gray-100 py-4 px-[10px] h-[70px] flex justify-between items-center sticky top-0">
      <div className="flex gap-4 items-center grow justify-between ">
        <BurgerMenu />
        <p className="hidden md:block">Статистика роста профессиональных компетенций сотрудника</p>
        <div className="flex items-center gap-2">
          <DialogSelect />
          <DisplayDate date={date} />
        </div>
      </div>
    </header>
  );
};

export default Header;
