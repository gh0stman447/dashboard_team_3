import React from 'react';

import PieBlock from './PieBlock';
import ComposedChartBlock from './ComposedChartBlock';
import TextLetBlock from './TextLetBlock';

const Main = () => {
  return (
    <div className="grid grid-cols-1 4xl:grid-cols-2 4xl:grid-row-3 gap-y-4 4xl:gap-[37px] p-2 justify-between text-black xl:p-8 bg-sky-blue 4xl:h-fit">
      <TextLetBlock />
      <ComposedChartBlock />
      <PieBlock />
    </div>
  );
};

export default Main;
