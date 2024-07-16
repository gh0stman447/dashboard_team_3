import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Select from '../ui/Select';
import SideBarOverlay from './SideBarOverlay';
import DatePicker from '../ui/DatePicker';
import { Settings } from '../../../../assets/Dashboard_1';

const Header = ({ toggleSideBar }: { toggleSideBar?: () => void }) => {
  const [isOptionsBarOpen, setIsOptionsBarOpen] = useState(false);

  const toggleOptionsBar = () => {
    setIsOptionsBarOpen(!isOptionsBarOpen);
  };

  return (
    <header className="z-10 font-inter text-[20px] bg-gray-100 bg-navy flex py-3 px-8 justify-between items-center sticky h-[80px] top-0 border-b border-b-slate-400 border-l-0 dark:border-slate-600">
      <div className="flex gap-4 items-center grow justify-between">
        <div className="text-white p-1 inline-block 2xl:hidden -ml-1.5 cursor-pointer">
          <RxHamburgerMenu className="w-7 h-7" onClick={toggleSideBar} />
        </div>
        <div className="xl:hidden cursor-pointer text-white">
          <Settings onClick={toggleOptionsBar} />
        </div>
      </div>
      <div
        className={`z-30 xl:flex xl:justify-end xl:gap-6 xl:items-center xl:static xl:translate-y-0 absolute top-0 left-0 w-full bg-gray-100 bg-navy transition-transform duration-300 ${
          isOptionsBarOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col xl:flex-row  gap-8 p-4 xl:p-0">
          <div className="flex flex-col xl:flex-row items-center gap-2">
            <p>Поиск сотрудника:</p>
            <input type="text" name="" id="" placeholder="ID или ФИО" className="border rounded-md px-2 py-3" />
          </div>
          <div className="flex flex-col xl:flex-row items-center gap-2">
            <p className="">Фильтр по навыкам:</p>
            <Select />
          </div>
          <div className="flex flex-col xl:flex-row items-center gap-2">
            <p>Выбор периода:</p>
            <DatePicker />
          </div>
        </div>
      </div>
      <SideBarOverlay isOpen={isOptionsBarOpen} toggler={toggleOptionsBar} />
    </header>
  );
};

export default Header;
