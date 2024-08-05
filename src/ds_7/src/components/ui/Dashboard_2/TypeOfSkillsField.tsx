import React, { FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import { InFormProps } from '../../../types';
import useDB2FiltersStore from '../../../store/DB2FiltersStore';
import { dataService } from '../../../services/DataDboard_2.service';
import { sortList } from '../../../utils/sortList';
import { useQuery } from 'react-query';

interface TypeOfSkillFieldProps extends InFormProps {
  typeOfSkills?: string[];
}

const TypeOfSkillsField: FC<TypeOfSkillFieldProps> = ({ patchState }) => {
  const [typesOfSkill, setTypeOfSkill] = useState<string[]>([]);
  const handleChangeTypeOfSkill = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;

    const newTypesOfSkill = typeof value === 'string' ? value.split(',') : value;

    setTypeOfSkill(newTypesOfSkill);

    patchState({ typesOfSkill: newTypesOfSkill });
  };

  const initialTypeOfSkill = useDB2FiltersStore((state) => state.typesOfSkill);

  useEffect(() => {
    setTypeOfSkill(initialTypeOfSkill);
  }, [initialTypeOfSkill]);

  const { data, isLoading, isError } = useQuery(
    'typeOfSkills',
    () => dataService.fetchTextLetAllTypesOfSkillData('typeOfSkills'),
    {
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка</div>;
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        maxWidth: 200
      }
    }
  };

  const sortedTypeOfSkills = sortList(data, 'skill_type');

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="typeOfSkills-select">Типы навыков</InputLabel>
      <Select
        id="typeOfSkills-select"
        multiple
        value={typesOfSkill}
        onChange={(e) => handleChangeTypeOfSkill(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {sortedTypeOfSkills.map(({ skill_type }) => (
          <MenuItem key={skill_type} value={skill_type}>
            <Checkbox checked={typesOfSkill.indexOf(skill_type) > -1} />
            <ListItemText primary={skill_type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeOfSkillsField;
