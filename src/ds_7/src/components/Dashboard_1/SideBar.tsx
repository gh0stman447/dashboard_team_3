import React from 'react';
import useUiStore from '../../store/uiStore';
import { Logo } from '../../../../assets/Dashboard_1';
import { Avatar } from '@mui/material';
// import Pic from '../../../../assets/Dashboard_2/Logo.png';
// import Pic2 from '../../../../assets/Dashboard_2/avatar.png';

const SideBar = () => {
  const isOpen = useUiStore((state) => state.isSidebarOpen);

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

        <div className="">
          <p>Общая Информация о Сотруднике:</p>
          <p>ID сотрудника.</p>
          <p>ФИО.</p>
          <p>Подразделение.</p>
          <p>Должность.</p>
          <p>Образование.</p>
          <p>Языки.</p>
          <p>Сертификаты (последние 3-5).</p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
