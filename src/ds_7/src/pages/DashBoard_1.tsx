import React, { useEffect, useState } from 'react';
import SideBar from '../components/Dashboard_1/SideBar';
import Header from '../components/Dashboard_1/Header';
import Main from '../components/Dashboard_1/Main';
import Overlay from '../components/Dashboard_1/Overlay';

export const DashBoard_1 = () => {
  return (
    <div className="4xl:flex 4xl:items-center 4xl:justify-center 4xl:h-screen">
      <div className="max-w-[1920px] rounded-none mx-auto font-montserrat">
        <div className="flex">
          <SideBar />
          <Overlay />
          <div className="flex-1">
            <Header />
            <Main />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard_1;
