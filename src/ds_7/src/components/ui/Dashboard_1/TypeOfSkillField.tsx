// import React, { useEffect, useState } from 'react';
// import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectItem } from '@mui/material';
// import { SKILLS } from '../../../constants/Dashboard_2';
// import { InFormProps } from '../../../types';
// import useDB1FiltersStore from '../../../store/DB1FiltersStore';

// interface MySelectProps extends InFormProps {
//   typeOfSkills?: string[];
// }

// const TypeOfSkillField: React.FC<MySelectProps> = ({ patchState }) => {
//   const [typeOfSkill, setTypeOfSkill] = useState<string>('');
//   const handleChangeTypeOfSkill = (event: SelectChangeEvent<string>) => {
//     const {
//       target: { value }
//     } = event;

//     setTypeOfSkill(value);
//     patchState({ typeOfSkill: value });
//   };

//   const initialTypeOfSkill = useDB1FiltersStore((state) => state.typeOfSkill);

//   useEffect(() => {
//     setTypeOfSkill(initialTypeOfSkill);
//   }, [initialTypeOfSkill]);

//   return (
//     <FormControl
//       fullWidth
//       variant="outlined"
//       color="success"
//       className="border border-white rounded-md"
//       sx={{ border: '1px solid black', backgroundColor: 'white' }}
//     >
//       <InputLabel id="demo-simple-select-label" sx={{ color: 'black' }}>
//         Навыки
//       </InputLabel>
//       <SelectItem
//         sx={{ color: 'black' }}
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         value={typeOfSkill}
//         label="Skill"
//         onChange={handleChangeTypeOfSkill}
//       >
//         <MenuItem value={''}>Ничего</MenuItem>
//         {SKILLS.map((skill) => (
//           <MenuItem key={skill.name} value={skill.name}>
//             {skill.name}
//           </MenuItem>
//         ))}
//       </SelectItem>
//     </FormControl>
//   );
// };

// export default TypeOfSkillField;

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from '@mui/material';
import { positions } from '../../../constants/Dashboard_2';
import { InFormProps } from '../../../types';
import useDB1FiltersStore from '../../../store/DB1FiltersStore';
import { useQuery } from 'react-query';
import { dataService } from '../../../services/Data.service';

interface PositionFieldProps extends InFormProps {}

const TypeOfSkillField: FC<PositionFieldProps> = ({ patchState }) => {
  const [typesOfSkill, setTypesOfSkill] = useState<string[]>([]);

  const handleChangePosition = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;

    const newTypesOfSkill = typeof value === 'string' ? value.split(',') : value;

    setTypesOfSkill(newTypesOfSkill);
    patchState({ typesOfSkill: newTypesOfSkill });
  };

  const initialTypesOfSkill = useDB1FiltersStore((state) => state.typesOfSkill);

  const { data, isLoading, isError } = useQuery(
    'typesOfSkill',
    () => dataService.fetchTypeOfSkillsData('typesOfSkill'),
    {
      refetchOnWindowFocus(query) {
        return !query?.isFetching;
      }
    }
  );

  useEffect(() => {
    setTypesOfSkill(initialTypesOfSkill);
  }, [initialTypesOfSkill]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="position-select">Тип навыка</InputLabel>
      <Select
        id="position-select"
        multiple
        value={typesOfSkill}
        onChange={(e) => handleChangePosition(e)}
        renderValue={(selected) => selected.join(', ')}
      >
        {data.map(({ skill_type }) => (
          <MenuItem key={skill_type} value={skill_type}>
            <Checkbox checked={typesOfSkill.indexOf(skill_type) > -1} />
            <ListItemText primary={skill_type} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeOfSkillField;
