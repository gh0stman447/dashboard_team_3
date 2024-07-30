import React from 'react';
import useUiStore from '../../../store/uiStore';
import { RxHamburgerMenu } from 'react-icons/rx';

const BurgerMenu = () => {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <div className="text-white p-1 inline-block 2xl:hidden -ml-1.5 cursor-pointer">
      <RxHamburgerMenu className="w-7 h-7" onClick={toggleSidebar} />
    </div>
  );
};

export default BurgerMenu;
