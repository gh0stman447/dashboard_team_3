import React from 'react';

import PieBlock from './PieBlock';
import ComposedChartBlock from './ComposedChartBlock';
import TextLetBlock from './TextLetBlock';
import { Button } from '@mui/material';
import { navigateToDboard } from '../../utils';
import CustomNavButton from '../ui/CustomNavButton';

const Main = () => {
  return (
    <div className="bg-sky-blue p-2 xl:p-8 xl:h-fit">
      <div className="mb-[20px]">
        <CustomNavButton dBoardNumber="2" text="Перейти на дашборд 2" />
      </div>
      <div className="grid grid-cols-1 4xl:grid-cols-2 4xl:grid-row-3 gap-y-4 4xl:gap-[37px] justify-between">
        <TextLetBlock />
        <ComposedChartBlock />
        <PieBlock />
      </div>
    </div>
  );
};

export default Main;
