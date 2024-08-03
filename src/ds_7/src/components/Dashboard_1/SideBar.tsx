import React, { Suspense, useState } from 'react';
import { Avatar } from '@mui/material';
import useUiStore from '../../store/uiStore';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import LeftArrow from '../../../../assets/Dashboard_1/LeftArrow';
import RightArrow from '../../../../assets/Dashboard_1/RightArrow';
import DarLogo from '../ui/DarLogo';
import SideBarRenderContent from './SideBarRenderContent';
import { CATS } from '../../constants/Dashboard_1';

const SideBar = () => {
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  const handleNextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) => (prevIndex + 1) % CATS.length);
  };

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex((prevIndex) => (prevIndex - 1 + CATS.length) % CATS.length);
  };

  const isOpen = useUiStore((state) => state.isSidebarOpen);

  const nextUser = useDB1FiltersStore((state) => state.nextUser);
  const prevUser = useDB1FiltersStore((state) => state.prevUser);

  const currentUser = useDB1FiltersStore((state) => state.empIdField);

  return (
    <aside
      className={`font-inter py-3 text-white shadow-lg bg-navy  overflow-y-scroll bg-gray-100 min-w-[250px] w-[250px] h-screen lg:h-auto fixed lg:sticky top-0 z-30 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="mt-[5px] mb-[50px] flex items-center justify-center">
        <DarLogo width="100px" height="100px" />
      </div>
      <div className="flex flex-col px-5 mt-[20px]">
        <p className="self-start md:hidden">Статистика роста профессиональных компетенций сотрудника</p>
        <div className="flex justify-center rounded-full my-[20px] md:my-[50px] md:mt-0">
          {currentUser ? (
            <Avatar src={CATS[currentAvatarIndex]} sx={{ width: 160, height: 160 }} />
          ) : (
            <Avatar sx={{ width: 160, height: 160 }} />
          )}
        </div>
        <div className="flex flex-col gap-y-2 ">
          <p className="text-[19px] mb-2">Общая Информация о сотруднике:</p>
          <SideBarRenderContent />
        </div>
        {currentUser && (
          <div className="flex gap-4 self-center mt-[50px]">
            <button
              className="btn btn-primary"
              onClick={() => {
                prevUser();
                handlePrevAvatar();
              }}
            >
              <LeftArrow />
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                nextUser();
                handleNextAvatar();
              }}
            >
              <RightArrow />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
