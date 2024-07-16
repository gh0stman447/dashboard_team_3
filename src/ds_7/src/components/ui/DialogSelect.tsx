import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Checkbox, ListItemText } from '@mui/material';
import DatePicker from './DatePicker';

interface DialogSelectProps {}
const DialogSelect: React.FC<DialogSelectProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<string[]>([]);
  const [devision, setDevision] = React.useState<string[]>([]);
  const [type, setType] = React.useState<string[]>([]);
  const [skillLevel, setSkillLevel] = React.useState<string[]>([]);

  const positions = ['Младший аналитик', 'Разработчик', 'Старший консультант', 'Бизнес аналитик'];
  const devisions = [
    'Qlik: Центр компетенций',
    'Направление DWH&ML',
    'Бизнес-аналитика по работе с гос.компаниями',
    'Направление BI',
    'Направление DG&DQ',
    'Microsoft: Центр компетенций'
  ];
  const typeOfSkills = [
    'Технологии',
    'Инструменты',
    'Среды разработки',
    'Базы данных',
    'Языки программирования',
    'Фреймворки'
  ];
  const skillLevels = ['ИСП', 'Novice', 'Junior', 'Middle', 'Senior', 'Expert'];

  const handleChangePosition = (event: SelectChangeEvent<typeof position>) => {
    const value = event.target.value;
    setPosition(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeDevision = (event: SelectChangeEvent<typeof devision>) => {
    const value = event.target.value;
    setDevision(typeof value === 'string' ? value.split(',') : value);
  };
  const handleChangeTypeOfSkills = (event: SelectChangeEvent<typeof typeOfSkills>) => {
    const value = event.target.value;
    setType(typeof value === 'string' ? value.split(',') : value);
  };
  const handleChangeSkillLevel = (event: SelectChangeEvent<typeof skillLevels>) => {
    const value = event.target.value;
    setSkillLevel(typeof value === 'string' ? value.split(',') : value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleApplyFilters = () => {
    setOpen(false);
    console.log(position);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} className="" variant="outlined" color="inherit">
        Фильтры
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Выберите фильтры</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="position-select">Должность</InputLabel>
              <Select
                id="position-select"
                multiple
                value={position}
                onChange={handleChangePosition}
                input={<OutlinedInput label="Position" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {positions.map((pos) => (
                  <MenuItem key={pos} value={pos}>
                    <Checkbox checked={position.indexOf(pos) > -1} />
                    <ListItemText primary={pos} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="devision-select">Подразделение</InputLabel>
              <Select
                id="devision-select"
                multiple
                value={devision}
                onChange={handleChangeDevision}
                input={<OutlinedInput label="Devision" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {devisions.map((dev) => (
                  <MenuItem key={dev} value={dev}>
                    <Checkbox checked={devision.indexOf(dev) > -1} />
                    <ListItemText primary={dev} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="typeOfSkills-select">Типы навыков</InputLabel>
              <Select
                id="typeOfSkills-select"
                multiple
                value={type}
                onChange={handleChangeTypeOfSkills}
                input={<OutlinedInput label="Type of Skills" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {typeOfSkills.map((typeOfSkill) => (
                  <MenuItem key={typeOfSkill} value={typeOfSkill}>
                    <Checkbox checked={type.indexOf(typeOfSkill) > -1} />
                    <ListItemText primary={typeOfSkill} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="skillLevel-select">Уровень навыка</InputLabel>
              <Select
                id="skillLevel-select"
                multiple
                value={skillLevel}
                onChange={handleChangeSkillLevel}
                input={<OutlinedInput label="skillLevel" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {skillLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Checkbox checked={skillLevel.indexOf(level) > -1} />
                    <ListItemText primary={level} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={handleApplyFilters}>Применить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogSelect;
