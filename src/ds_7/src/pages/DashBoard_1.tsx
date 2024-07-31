import React, { useEffect, useState } from 'react';
import SideBar from '../components/Dashboard_1/SideBar';
import Header from '../components/Dashboard_1/Header';
import Overlay from '../components/ui/Dashboard_1/Overlay';
import Main from '../components/Dashboard_1/Main';

export const DashBoard_1 = () => {
  return (
    <div className="font-montserrat flex flex-col justify-center">
      <div className="flex">
        <SideBar />
        <Overlay />
        <div className="flex-1">
          <Header />
          <Main />
        </div>
      </div>
    </div>
  );
};

export default DashBoard_1;
