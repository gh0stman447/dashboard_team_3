import React from 'react';

const SideBarOverlay = ({ isOpen, toggler }) => {
  return (
    <div
      className={`fixed inset-0 bg-black z-20 cursor-default opacity-0 2xl:hidden transition-opacity pointer-events-none ${
        isOpen ? 'opacity-50 pointer-events-auto' : ''
      }`}
      onClick={toggler}
    ></div>
  );
};

export default SideBarOverlay;
