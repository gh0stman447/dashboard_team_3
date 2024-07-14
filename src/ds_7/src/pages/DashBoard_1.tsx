import React, { useEffect, useState } from 'react';
import { FilterProvider } from '../context/Dashboard_1/FilterContext';
import DialogSelect from '../components/ui/DialogSelect';
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
      <div className="max-w-[1920px] h-[960px] rounded-none font-sans mx-auto ">
        <div className="flex flex-grow ">
          <SideBar isOpen={isSidebarOpen} />
          <SideBarOverlay isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} />
          <div className="flex-1">
            <Header toggleSideBar={toggleSidebar} />
            <Main />
          </div>
        </div>
      </div>
    </FilterProvider>
  );
};

export default DashBoard_1;
