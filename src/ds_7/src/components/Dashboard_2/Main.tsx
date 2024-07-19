import React from 'react';

import PieBlock from './PieBlock';
import TextLetBlock from './TextLetBlock';
import BarSecondBlock from './BarSecondBlock';
import BarFirstBlock from './BarFirstBlock';
import SkillLevelField from '../ui/Dashboard_2/SkillLevelField';
import SkillsField from '../ui/Dashboard_2/SkillsField';

const Main = () => {
  return (
    <div className="bg-sky-blue border flex flex-col gap-6 border-black p-4 2xl:p-8">
      <div className="flex flex-col gap-4 2xl:gap-8 md-lg:flex-row">
        <PieBlock />
        <TextLetBlock />
      </div>
      <div className="flex items-center justify-center self-center rounded-xl">
        <SkillsField />
      </div>
      <div className="flex flex-col gap-4 2xl:gap-8 2xl:flex-row">
        <BarFirstBlock />
        <BarSecondBlock />
      </div>
    </div>
  );
};

export default Main;
