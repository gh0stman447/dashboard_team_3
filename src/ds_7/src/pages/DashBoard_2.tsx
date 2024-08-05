import React from 'react';
import Header from '../components/Dashboard_2/Header';
import Main from '../components/Dashboard_2/Main';

const DashBoard_2 = () => {
  return (
    <div className="flex-1 font-montserrat h-full flex flex-col justify-center bg-sky-blue">
      <Header />
      <Main />
    </div>
  );
};

export default DashBoard_2;
