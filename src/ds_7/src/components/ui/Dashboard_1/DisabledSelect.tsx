import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import { ALL_SKILL_TYPES } from '../../../constants/Dashboard_2';

const DisabledSelect = () => {
  const { employeeId, skillTypes } = useDB1FiltersStore((state) => ({
    skillTypes: state.typesOfSkill,
    employeeId: state.empIdField
  }));

  const renderArray = skillTypes.length === 0 ? ALL_SKILL_TYPES : skillTypes;

  return (
    <div className="flex gap-4 text-[23px] 2xl:text-[36px] w-full">
      {employeeId && (
        <FormControl fullWidth variant="outlined">
          <InputLabel id="skill-select-label">Отображаемые типы навыков</InputLabel>
          <Select labelId="skill-select-label" id="skill-select" sx={{ width: '100%' }}>
            {renderArray.sort().map((type, index) => (
              <MenuItem key={index} value={type} disabled>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default DisabledSelect;
