import React from 'react';

const SideBar = ({ isOpen }) => {
  return (
    <aside
      className={`text-white bg-gray-100 bg-navy w-[256px] dark:text-white flex fixed flex-col lg:sticky top-0 z-30 h-screen transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 border-r border-r-slate-400`}
    >
      <p>Статистика роста профессиональных компетенций сотрудника</p>
      <div className="flex justify-center rounded-full">
        <img src="/src/assets/Dashboard_2/avatar.png" alt="фото" width={200} height={200} />
      </div>
      {/* <TheLogo />
      <TheNav />
      <TheFooter /> */}
      <div>
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
