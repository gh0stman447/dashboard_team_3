import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import NoChartComponent from '../NoChartComponent';
import { useSKillsData } from '../../../hooks/Dashboard_2';

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
  const skillsArray: string[] = skillsData.map(({ skill }) => skill);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300
      }
    }
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 200,
        maxWidth: 300,
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
      }}
    >
      <InputLabel id="skills-select" sx={{ backgroundColor: 'white', px: '4px' }}>
        Навыки
      </InputLabel>
      <Select
        id="skills-select"
        multiple
        value={skills}
        onChange={(e) => handleChangeSkillLevel(e)}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {skillsArray.map((skill) => (
          <MenuItem key={skill} value={skill}>
            <Checkbox checked={skills.indexOf(skill) > -1} />
            <ListItemText primary={skill} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SkillsField;
