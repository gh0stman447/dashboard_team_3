import React from 'react';

import PieBlock from './PieBlock';
import TextLetBlock from './TextLetBlock';
import BarSecondBlock from './BarSecondBlock';
import BarFirstBlock from './BarFirstBlock';
import SkillsField from '../ui/Dashboard_2/SkillsField';
import CustomNavButton from '../ui/CustomNavButton';
import useDB2FiltersStore from '../../store/DB2FiltersStore';

const Main = () => {
  const { devision, position } = useDB2FiltersStore((state) => ({
    position: state.position,
    devision: state.devision
  }));

  return (
    <div className="bg-sky-blue border flex flex-col gap-6 border-black p-4 2xl:p-8">
      <div className="mb-[20px]">
        <CustomNavButton dBoardNumber="1" text="Перейти на статистику по сотруднику" />
      </div>
      <div className="flex flex-col gap-4 2xl:gap-8 md-lg:flex-row">
        <PieBlock />
        <TextLetBlock />
      </div>
      {(devision.length !== 0 || position.length !== 0) && (
        <div className="flex items-center justify-center self-center rounded-xl">
          <SkillsField />
        </div>
      )}
      <div className="flex flex-col gap-4 2xl:gap-8 2xl:flex-row">
        <BarFirstBlock />
        <BarSecondBlock />
      </div>
    </div>
  );
};

export default Main;
