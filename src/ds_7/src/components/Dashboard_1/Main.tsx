import React from 'react';

import PieBlock from './PieBlock';
import ComposedChartBlock from './ComposedChartBlock';
import TextLetBlock from './TextLetBlock';
import CustomNavButton from '../ui/CustomNavButton';
import useDB1FiltersStore from '../../store/DB1FiltersStore';

const Main = () => {
  const empIdField = useDB1FiltersStore((state) => state.empIdField);

  return (
    <div className="bg-sky-blue p-2 xl:p-8 xl:h-fit">
      <div className="mb-[20px]">
        <CustomNavButton dBoardNumber="2" text="Перейти на дашборд 2" />
      </div>
      <div className="flex flex-col gap-4 4xl:grid 4xl:grid-cols-2 4xl:grid-row-3 gap-y-4 4xl:gap-[37px] justify-between">
        <TextLetBlock />
        <ComposedChartBlock />
        <PieBlock />
      </div>
    </div>
  );
};

export default Main;
