import React from 'react';
import useUiStore from '../../store/uiStore';

const Overlay = () => {
  const { isSidebarOpen, toggleOptionsBar, toggleSidebar, isOptionsBarOpen } = useUiStore((state) => state);

  return (
    <div
      className={`fixed inset-0 bg-black ${
        isSidebarOpen ? 'z-20' : 'z-10'
      } cursor-default opacity-0 2xl:hidden transition-opacity pointer-events-none ${
        isOptionsBarOpen || isSidebarOpen ? 'opacity-50 pointer-events-auto' : ''
      }`}
      onClick={isSidebarOpen ? toggleSidebar : toggleOptionsBar}
    ></div>
  );
};

export default Overlay;
