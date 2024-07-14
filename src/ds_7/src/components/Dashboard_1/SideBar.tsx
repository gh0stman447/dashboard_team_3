import React from 'react';
// import Pic from '../../../../assets/Dashboard_2/Logo.png';
// import Pic2 from '../../../../assets/Dashboard_2/avatar.png';

const SideBar = ({ isOpen }) => {
  return (
    <aside
      className={`text-white overflow-y-scroll bg-gray-100 bg-navy min-w-[325px] w-[325px] dark:text-white flex fixed flex-col 2xl:sticky top-0 z-30 h-screen transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } 2xl:translate-x-0 border-r border-r-slate-400`}
    >
      <div className="">
        {/* <img src={Pic} alt="Логотип" /> */}
        картинка
      </div>
      <p className="text-[26px] pl-[15px] pr-[22px]">Статистика роста профессиональных компетенций сотрудника</p>
      <div className="flex justify-center rounded-full py-[50px]">
        {/* <img src={Pic2} alt="фото" width={200} height={200} /> */}
        картинка
      </div>
      {/* <TheLogo />
      <TheNav />
      <TheFooter /> */}
      <div className="pl-[46px] pr-[19px]">
        <p>Общая Информация о Сотруднике:</p>
        <p>ID сотрудника.</p>
        <p>ФИО.</p>
        <p>Подразделение.</p>
        <p>Должность.</p>
        <p>Образование.</p>
        <p>Языки.</p>
        <p>Сертификаты (последние 3-5).</p>
      </div>
    </aside>
  );
};

export default SideBar;
