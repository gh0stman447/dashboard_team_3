export const sortList = <T, K extends keyof T>(data: T[], key: K): T[] => {
  return [...data].sort((a, b) => {
    const valueA = String(a[key]);
    const valueB = String(b[key]);
    return valueA.localeCompare(valueB);
  });
};