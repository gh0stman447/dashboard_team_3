import React, { Suspense } from 'react';
import { Logo } from '../../../../assets/Dashboard_1';
import { Avatar } from '@mui/material';
import useUiStore from '../../store/uiStore';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import LeftArrow from '../../../../assets/Dashboard_1/LeftArrow';
import RightArrow from '../../../../assets/Dashboard_1/RightArrow';

const SideBarRenderContentLazy = React.lazy(() => import('./SideBarRenderContent'));
const SideBar = () => {
  const isOpen = useUiStore((state) => state.isSidebarOpen);

  const nextUser = useDB1FiltersStore((state) => state.nextUser);
  const prevUser = useDB1FiltersStore((state) => state.prevUser);

  const currentUser = useDB1FiltersStore((state) => state.empIdField);

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
        <div className="flex flex-col gap-y-2 text-[16px]">
          <p className="text-[18px]">Общая Информация о Сотруднике:</p>
          <Suspense fallback={<div>Загрузка информации о сотруднике...</div>}>
            <SideBarRenderContentLazy />
          </Suspense>
        </div>
        {currentUser && (
          <div className="flex gap-4 self-center mt-5">
            <button className="btn btn-primary" onClick={prevUser}>
              <LeftArrow />
            </button>
            <button className="btn btn-primary" onClick={nextUser}>
              <RightArrow />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
