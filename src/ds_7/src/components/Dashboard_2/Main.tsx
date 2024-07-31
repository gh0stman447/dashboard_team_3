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
    <div className="bg-sky-blue border flex flex-col gap-2 border-black p-2 px-3 2xl:p-8 overflow-y-scroll">
      <div className="mb-[5px]">
        <CustomNavButton dBoardNumber="1" text="Перейти на статистику по сотруднику" />
      </div>
      <div className="flex flex-col gap-2 md-lg:flex-row">
        <PieBlock />
        <TextLetBlock />
      </div>
      {(devision.length !== 0 || position.length !== 0) && (
        <div className="flex items-center justify-center self-center rounded-xl">
          <SkillsField />
        </div>
      )}
      <div className="flex flex-col gap-2 md-lg:flex-row">
        <BarFirstBlock />
        <BarSecondBlock />
      </div>
    </div>
  );
};

export default Main;
