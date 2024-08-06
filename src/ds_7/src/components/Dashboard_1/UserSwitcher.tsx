import React, { Dispatch, SetStateAction, useState } from 'react';
import useDB1FiltersStore from '../../store/DB1FiltersStore';
import { CATS } from '../../constants/Dashboard_1';
import { LeftArrow, RightArrow } from '../../../assets';
import ArrowUserSwitcher from '../ui/ArrowUserSwitcher';

const UserSwitcher = ({ userHandler }: { userHandler: Dispatch<SetStateAction<number>> }) => {
  const handleNextAvatar = () => {
    userHandler((prevIndex) => (prevIndex + 1) % CATS.length);
  };

  const handlePrevAvatar = () => {
    userHandler((prevIndex) => (prevIndex - 1 + CATS.length) % CATS.length);
  };
  const nextUser = useDB1FiltersStore((state) => state.nextUser);
  const prevUser = useDB1FiltersStore((state) => state.prevUser);

  return (
    <>
      <ArrowUserSwitcher
        onClick={() => {
          prevUser();
          handlePrevAvatar();
        }}
      >
        <LeftArrow />
      </ArrowUserSwitcher>
      <ArrowUserSwitcher
        onClick={() => {
          nextUser();
          handleNextAvatar();
        }}
      >
        <RightArrow />
      </ArrowUserSwitcher>
    </>
  );
};

export default UserSwitcher;
