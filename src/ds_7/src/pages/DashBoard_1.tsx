import React, { useEffect, useState } from 'react';
import SideBar from '../components/Dashboard_1/SideBar';
import Header from '../components/Dashboard_1/Header';
import Overlay from '../components/ui/Dashboard_1/Overlay';
import Main from '../components/Dashboard_1/Main';
import { UsersFetcher } from '../components/ui/Dashboard_1/SearchEmployeeField';

export const DashBoard_1 = () => {
  return (
    <div className="font-montserrat flex flex-col justify-center bg-sky-blue h-full">
      <UsersFetcher />
      <div className="overflow-y-scroll">
        <div className="flex border border-navy">
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
