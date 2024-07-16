export const SKILLS = [
  { name: 'Базы данных', value: 17 },
  { name: 'Платформы', value: 12 },
  { name: 'Языки программирования', value: 19 },
  { name: 'Инструменты', value: 11 },
  { name: 'Типы систем', value: 1 },
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
    empLvl: LEVEL['Middle'],
    middleLvl: LEVEL['Middle'],
    improvement: LEVEL['Junior']
  },
  {
    name: 'GO',
    empLvl: LEVEL['Junior'],
    middleLvl: LEVEL['Junior'],
    improvement: LEVEL['Junior']
  },
  {
    name: 'Kotlin',
    empLvl: LEVEL['Junior'],
    middleLvl: LEVEL['Middle'],
    improvement: LEVEL['Junior']
  },
  {
    name: 'C++',
    empLvl: LEVEL['Senior'],
    middleLvl: LEVEL['Middle'],
    improvement: LEVEL['Expert']
  },
  {
    name: 'C',
    empLvl: LEVEL['Senior'],
    middleLvl: LEVEL['Middle'],
    improvement: LEVEL['Senior']
  },
  {
    name: 'SQL',
    empLvl: LEVEL['Expert'],
    middleLvl: LEVEL['Junior'],
    improvement: LEVEL['Expert']
  },
  {
    name: 'PHP',
    empLvl: LEVEL['Junior'],
    middleLvl: LEVEL['Novice'],
    improvement: LEVEL['Junior']
  },
  {
    name: 'HTML',
    empLvl: LEVEL['ИНП'],
    middleLvl: LEVEL['ИНП'],
    improvement: LEVEL['Novice']
  },
  {
    name: 'Java',
    empLvl: LEVEL['Junior'],
    middleLvl: LEVEL['Novice'],
    improvement: LEVEL['Junior']
  },
  {
    name: 'JavaScript',
    empLvl: LEVEL['Junior'],
    middleLvl: LEVEL['Junior'],
    improvement: LEVEL['Junior']
  }
];
