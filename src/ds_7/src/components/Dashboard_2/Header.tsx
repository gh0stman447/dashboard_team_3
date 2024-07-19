import React from 'react';
import DialogSelect from '../ui/Dashboard_2/DialogSelect';
import { Logo } from '../../../../assets/Dashboard_1';

const Header = () => {
  return (
    <header className="z-10 font-inter text-[20px] bg-gray-100 bg-navy flex p-[10px] px-[20px] justify-between items-center sticky h-[80px] top-0 border-b border-b-slate-400 border-l-0 dark:border-slate-600">
      <Logo />
      <div className="hidden lg:block">
        <p>Статистика роста профессиональных компетенций сотрудников</p>
      </div>
      <div>
        <DialogSelect />
      </div>
    </header>
  );
};

export default Header;
