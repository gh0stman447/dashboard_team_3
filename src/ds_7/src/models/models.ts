export interface IBarChartEmployeeData {
  name: string;
  level_num: number;
  job_title: string;
}

export interface IBarChartAllPeopleData {
  name: string;
  level_num: number;
}

export interface IUserData {
  employees_id: number;
  first_name: string;
  last_name: string;
  department: string;
  job_title: string;
  activity: string;
}

export interface IPieData {
  name: string;
  value: number;
  color: string;
}

export interface ITextLetData {
  totalSkills: number;
}

export interface ITypesOfSkillData {
  skill_type: string;
}

export interface IUserIdData {
  value: number;
  label: string;
}

export interface IAllDepartmentsData {
  department: string;
}

export interface ICountOfEmpBySkillData {
  name: string;
  countOfEmployees: number;
}

export interface IAllPositionsData {
  job_title: string;
}

export interface ICountOfEmpBySkillLevelData {
  level_num: number;
  countOfEmployees: number;
  employees_id: number;
  name: string;
}

export interface IAllSkillsData {
  skill: string;
}

export interface ITextLetDepartmentData {
  totalCountOfSkills: number;
}

export interface ITextLetAllTypesOfSkillData {
  skill_type: string;
}
