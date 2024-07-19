import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import useUiStore from '../../store/uiStore';
import DialogSelect from '../ui/Dashboard_1/DialogSelect';
import BurgerMenu from './BurgerMenu';

const Header = () => {
  return (
    <header className="z-10 font-inter text-[20px] bg-gray-100 bg-navy py-3 px-8 flex justify-between items-center sticky h-[80px] top-0 border-b border-b-slate-400 border-l-0">
      <div className="flex gap-4 items-center grow justify-between ">
        <BurgerMenu />
        <p className="hidden lg:block">Статистика роста профессиональных компетенций сотрудников</p>
        <DialogSelect />
      </div>
    </header>
  );
};

export default Header;
