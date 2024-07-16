import React from 'react';
import DialogSelect from '../ui/DialogSelect';

const Header = () => {
  return (
    <header className="z-10 font-inter text-[20px] bg-gray-100 bg-navy flex py-3 px-8 justify-between items-center sticky h-[80px] top-0 border-b border-b-slate-400 border-l-0 dark:border-slate-600">
      <div>
        <img src="../../../../assets/Dashboard_2/Logo.png" alt="Логотип" />
      </div>
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
