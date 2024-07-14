import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

const Header = ({ toggleSideBar }) => {
  return (
    <header className="bg-gray-100 bg-navy flex flex-1 py-3 px-8 justify-between sticky h-[58px] top-0 border-b border-b-slate-400 border-l-0 dark:border-slate-600">
      <div className="flex gap-4 items-center">
        <div className="text-[#969696] p-1 inline-block lg:hidden -ml-1.5 cursor-pointer">
          <RxHamburgerMenu className="w-7 h-7" onClick={toggleSideBar} />
        </div>
        <div className="flex gap-6 justify-between items-center max-w-[1300px]">
          <div>
            <p>Поиск сотрудника:</p>
            <input type="text" name="" id="" placeholder="ID или ФИО" />
          </div>
          <div>
            <p>Фильтр по навыкам:</p>
            <input type="text" name="" id="" placeholder="ID или ФИО" />
          </div>
          <div>
            <p>Выбор периода:</p>
            <input type="date" name="" id="" placeholder="ID или ФИО" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
