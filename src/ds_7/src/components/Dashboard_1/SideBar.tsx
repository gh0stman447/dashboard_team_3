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
      className={`font-inter text-white overflow-y-scroll bg-gray-100 bg-navy min-w-[250px] w-[250px] h-screen lg:h-auto fixed lg:sticky top-0 z-30 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 border-r border-r-slate-400`}
    >
      <div className="mt-[5px]">
        <Logo />
      </div>
      <div className="flex flex-col px-5">
        <p className="self-start md:hidden">Статистика роста профессиональных компетенций сотрудника</p>
        <div className="flex justify-center rounded-full my-[20px] md:my-[50px] md:mt-0">
          <Avatar sx={{ width: 160, height: 160 }} />
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
