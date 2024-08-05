interface EmpInfo {
  name: string;
  level_num: number;
  job_title: string;
}

export const calculateImprovementForBarChart = (endData: EmpInfo[], beginData: EmpInfo[]) => {
  return endData.map((endSkill) => {
    const beginSkill = beginData.find((skill) => skill.name === endSkill.name);
    const improvement = beginSkill ? endSkill.level_num - beginSkill.level_num : endSkill.level_num;
    return {
      name: endSkill.name,
      empLvl: beginSkill ? beginSkill.level_num : 0,
      improvement
    };
  });
};

interface EmployeesBySkillsData {
  name: string;
  countOfEmployees: number;
}

export const getGrowthOfEmployeesBySkillForBarChart = (
  endData: EmployeesBySkillsData[],
  begginData: EmployeesBySkillsData[]
) => {
  return endData.map((skill) => {
    const beggingSkill = begginData.find((beggingSkill) => beggingSkill.name === skill.name); // Находим такой же навык, как и на конец периода

    return {
      ...skill,
      // Прирост будет всегда положительный. Если на начало периода нет данных, то прирост равен количеству сотрудников на конец периода
      growth: beggingSkill ? Math.abs(skill.countOfEmployees - beggingSkill.countOfEmployees) : skill.countOfEmployees,
      // Если на начало периода нет данных, то кол-во сотрудников равно 0. Иначе если разность
      // данных на конец и начало периода < 0, то кол-во сотрудников равно кол-ву на конец периода, иначе на начало
      countOfEmployees: beggingSkill
        ? skill.countOfEmployees - beggingSkill.countOfEmployees < 0
          ? skill.countOfEmployees
          : beggingSkill.countOfEmployees
        : 0,
      // Делаем соответствующий флаг в зависимости от знака разности данных на конец и на начало периода
      wasNegative: !(skill.countOfEmployees - (beggingSkill?.countOfEmployees || 0) > 0)
    };
  });
};

interface EmployeesBySkillLevelData {
  level_num: number;
  countOfEmployees: number;
}
export const getGrowthOfEmployeesBySkillLevelForBarChart = (
  endData: EmployeesBySkillLevelData[],
  begginData: EmployeesBySkillLevelData[]
) => {
  return endData.map((skill) => {
    const beggingSkill = begginData.find((beggingSkill) => beggingSkill.level_num === skill.level_num);

    return {
      ...skill,
      growth: beggingSkill ? Math.abs(skill.countOfEmployees - beggingSkill.countOfEmployees) : skill.countOfEmployees,
      countOfEmployees: beggingSkill
        ? skill.countOfEmployees - beggingSkill.countOfEmployees < 0
          ? skill.countOfEmployees
          : beggingSkill.countOfEmployees
        : 0,
      wasNegative: !(skill.countOfEmployees - (beggingSkill?.countOfEmployees || 0) > 0)
    };
  });
};

export const getHighestLevelDataForBarChart = (
  data: {
    level_num: number;
    countOfEmployees: number;
    employees_id: number;
    name: string;
  }[]
): { level_num: number; countOfEmployees: number }[] => {
  const maxLevelMap = new Map();

  // Пробегаеимся по сотрудникам для определения максимального уровн по соответствующему навыку
  data.forEach((item) => {
    const { employees_id, name, level_num } = item;
    const key = `${employees_id}_${name}`;
    if (!maxLevelMap.has(key) || level_num > maxLevelMap.get(key)) {
      maxLevelMap.set(key, level_num);
    }
  });

  console.log(maxLevelMap, 'maxLevelMap');

  const levelCountMap = new Map();

  // Пробегаемся по сотрудникам и считаем кол-во сотрудников в каждом уровне
  data.forEach((item) => {
    const { employees_id, name, level_num } = item;
    const key = `${employees_id}_${name}`;
    if (maxLevelMap.get(key) === level_num) {
      // Если уровень сотрудника равен максимальному уровню навыка и его нет в словаре, то добавляем его. Иначе увеличиваем счетчик
      if (!levelCountMap.has(level_num)) {
        levelCountMap.set(level_num, 0);
      }
      levelCountMap.set(level_num, levelCountMap.get(level_num) + 1);
    }
  });

  console.log(levelCountMap, 'levelCountMap');

  return Array.from(levelCountMap, ([level_num, countOfEmployees]) => ({
    level_num,
    countOfEmployees
  }));
};
