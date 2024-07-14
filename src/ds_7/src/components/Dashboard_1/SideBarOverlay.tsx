import React from 'react';

const SideBarOverlay = ({ isOpen, toggleSideBar }) => {
  return (
    <div
      className={`fixed inset-0 bg-black z-20 cursor-default opacity-0 lg:hidden transition-opacity pointer-events-none ${
        isOpen ? 'opacity-50 pointer-events-auto' : ''
      }`}
      onClick={toggleSideBar}
    ></div>
  );
};

export default SideBarOverlay;
