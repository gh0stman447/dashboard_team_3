export const SKILLS = [
  { name: 'Базы данных', value: 17 },
  { name: 'Платформы', value: 12 },
  { name: 'Языки программирования', value: 19 },
  { name: 'Инструменты', value: 11 },
  { name: 'Системы', value: 1 },
  { name: 'Фреймворки', value: 15 },
  { name: 'Среды разработки', value: 4 },
  { name: 'Технологии', value: 14 }
];

// export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#4682B4', '#6A5ACD', '#708090'];

export const enum LEVEL {
  'ИНП' = 0,
  'Novice' = 1,
  'Junior' = 2,
  'Middle' = 3,
  'Senior' = 4,
  'Expert' = 5
}

export const BAR_DATA = [
  {
    name: 'Python',
    empLvl: LEVEL['Junior'],
    middleLvl: LEVEL['Middle'],
    improvement: LEVEL['Middle']
  },
  {
    name: 'GO',
    empLvl: LEVEL['Junior'],
    middleLvl: LEVEL['Junior'],
    improvement: LEVEL['Junior']
  },

 
];

export const typeOfSkills = [
  'Технологии',
  'Инструменты',
  'Среды разработки',
  'Базы данных',
  'Языки программирования',
  'Фреймворки'
];

export const positions = ['Младший аналитик', 'Разработчик', 'Старший консультант', 'Бизнес аналитик'];

export const devisions = [
  'Qlik: Центр компетенций',
  'Направление DWH&ML',
  'Бизнес-аналитика по работе с гос.компаниями',
  'Направление BI',
  'Направление DG&DQ',
  'Microsoft: Центр компетенций'
];

export const skillLevels = ['ИСП', 'Novice', 'Junior', 'Middle', 'Senior', 'Expert'];

export const skills = ['PostgreSQL', 'MSQL', 'MySQL', 'Oracle', 'MongoDB'];
