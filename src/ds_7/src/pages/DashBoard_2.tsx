import React from 'react';
import Header from '../components/Dashboard_2/Header';
import { UrlState } from 'bi-internal/core';
import Main from '../components/Dashboard_2/Main';

const DashBoard_2 = () => {
  return (
    <div className="max-w-[1920px] mx-auto font-montserrat">
      <div className="flex-1">
        <Header />
        <Main />
      </div>
    </div>
  );
};

export default DashBoard_2;
