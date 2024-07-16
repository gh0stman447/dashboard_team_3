import React, { useEffect, useState } from 'react';
import { FilterProvider } from '../context/Dashboard_1/FilterContext';
import SideBar from '../components/Dashboard_1/SideBar';
import SideBarOverlay from '../components/Dashboard_1/SideBarOverlay';
import Header from '../components/Dashboard_1/Header';
import Main from '../components/Dashboard_1/Main';

export const DashBoard_1 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <FilterProvider>
      <div className="4xl:flex 4xl:items-center 4xl:justify-center 4xl:h-screen">
        <div className="max-w-[1920px] 4xl:max-h-[960px] rounded-none mx-auto font-montserrat">
          <div className="flex flex-grow ">
            <SideBar isOpen={isSidebarOpen} />
            <SideBarOverlay isOpen={isSidebarOpen} toggler={toggleSidebar} />
            <div className="flex-1">
              <Header toggleSideBar={toggleSidebar} />
              <Main />
            </div>
          </div>
        </div>
      </div>
    </FilterProvider>
  );
};

export default DashBoard_1;
