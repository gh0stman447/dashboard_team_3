import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../../services/DataDboard2.service';
import { transformFiltersFromDB2 } from '../../../utils';

const SkillsField = () => {
  const [skills, setSkills] = useState<string[]>([]);

  const filters = useDB2FiltersStore((state) => ({
    position: state.position,
    devision: state.devision,
    typesOfSkill: state.typesOfSkill,
    date: state.date
  }));

  const storeSkills = useDB2FiltersStore((state) => state.skills);

  useEffect(() => {
    setSkills(storeSkills);
  }, [storeSkills]);

  const storeSetSkills = useDB2FiltersStore((state) => state.setSkills);

  const transformedFilters = transformFiltersFromDB2(filters);

  const queryFilters =
    filters.position.length === 0 && filters.devision.length === 0
      ? { ...transformedFilters }
      : filters.position.length === 0 && filters.devision.length > 0
      ? { ...transformedFilters, is_depart_key_skill: ['=', true] }
      : filters.devision.length === 0 && filters.position.length > 0
      ? { ...transformedFilters, is_job_key_skill: ['=', true] }
      : { ...transformedFilters, is_job_key_skill: ['=', true] };

  const {
    data: skillsAllTimeDate,
    isLoading: isLoadingSkillsAllTimeDate,
    isError: isErrorSkillsAllTimeDate
  } = useQuery(['skillsAllTimeDate', filters], () =>
    dataService.fetchSkillsData({ ...queryFilters, date: undefined }, 'skillsAllTimeDate')
  );

  const {
    data: skillsEndSelectedDate,
    isLoading: isLoadingSkillsEndSelectedDate,
    isError: isErrorSkillsEndSelectedDate
  } = useQuery(
    ['skillsEndSelectedDate', filters],
    () =>
      dataService.fetchSkillsData(
        { ...queryFilters, date: ['<=', filters.date[1].format('YYYY-MM-DD')] },
        'skillsEndSelectedDate'
      ),
    {
      enabled: !!filters.date
    }
  );

  useEffect(() => {
    storeSetSkills([]);
  }, [skillsAllTimeDate, skillsEndSelectedDate]);

  if (isLoadingSkillsAllTimeDate || isLoadingSkillsEndSelectedDate) {
    return <div>Loading...</div>;
  }

  if (isErrorSkillsAllTimeDate || isErrorSkillsEndSelectedDate) {
    return <div>Error</div>;
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
      <InputLabel id="skills-select">Навыки</InputLabel>
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
