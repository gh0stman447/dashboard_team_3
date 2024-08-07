import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import NoChartComponent from '../NoChartComponent';
import { useSKillsData } from '../../../hooks/Dashboard_2';
import CustomMultipleSelect from '../../CustomMultipleSelect';

const SkillsField = () => {
  const [skills, setSkills] = useState<string[]>([]);

  const filters = useDB2FiltersStore((state) => ({
    position: state.position,
    devision: state.devision,
    typesOfSkill: state.typesOfSkill,
    date: state.date
  }));

  const { skillsAllTimeDate, skillsEndSelectedDate, isLoading, isError } = useSKillsData(filters);

  const storeSetSkills = useDB2FiltersStore((state) => state.setSkills);

  useEffect(() => {
    storeSetSkills([]);
  }, [skillsAllTimeDate, skillsEndSelectedDate]);

  const storeSkills = useDB2FiltersStore((state) => state.skills);

  useEffect(() => {
    setSkills(storeSkills);
  }, [storeSkills]);

  const { devision, position } = useDB2FiltersStore((state) => ({
    position: state.position,
    devision: state.devision
  }));

  // Если нет выбранных подразделений и должностей, то не отображаем селект
  if (devision.length === 0 && position.length === 0) {
    return null;
  }

  const statusMessage = isLoading ? 'Загрузка...' : isError ? 'Ошибка' : undefined;

  if (statusMessage) {
    return <NoChartComponent label={statusMessage} />;
  }

  const handleChangeSkillLevel = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;

    const newSkills = typeof value === 'string' ? value.split(',') : value;

    setSkills(newSkills);
    storeSetSkills(newSkills);
  };

  const skillsData = filters.date ? skillsEndSelectedDate : skillsAllTimeDate;

  return (
    <CustomMultipleSelect
      data={skillsData}
      localData={skills}
      handler={(e) => handleChangeSkillLevel(e)}
      label="Навыки"
      valueField="skill"
      formControlStyles={{
        maxWidth: 300,
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
      }}
    />
  );
};

export default SkillsField;
