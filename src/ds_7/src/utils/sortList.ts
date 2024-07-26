import { GenericObject } from '../types';

export const sortList = (data: GenericObject[], key: string): GenericObject[] => {
  return [...data].sort((a, b) => a[key].localeCompare(b[key]));
};
