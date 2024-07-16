import React from 'react';
import Header from '../components/Dashboard_2/Header';
import Main from '../components/Dashboard_1/Main';

const DashBoard_2 = () => {
  return (
    <div className="4xl:flex 4xl:items-center 4xl:justify-center 4xl:h-screen">
      <div className="max-w-[1920px] 4xl:max-h-[960px] rounded-none mx-auto font-montserrat">
        <div className="flex-1">
          <Header />
          <Main />
        </div>
      </div>
    </div>
  );
};

export default DashBoard_2;
