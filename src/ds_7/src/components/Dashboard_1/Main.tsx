import React from 'react';

import PieBlock from './PieBlock';
import ComposedChartBlock from './ComposedChartBlock';
import TextLetBlock from './TextLetBlock';
import CustomNavButton from '../ui/CustomNavButton';
import useDB1FiltersStore from '../../store/DB1FiltersStore';

const Main = () => {
  return (
    <div className="bg-sky-blue p-2 xl:p-4 overflow-y-scoll">
      <div className="mb-[5px]">
        <CustomNavButton dBoardNumber="2" text="Перейти на статистику по депортаменту" />
      </div>
      <div className="flex flex-col md-lg:flex-row gap-4">
        <div className="flex flex-col gap-4 md-lg:w-1/2">
          <TextLetBlock />
          <PieBlock />
        </div>
        <ComposedChartBlock />
      </div>
    </div>
  );
};

export default Main;
