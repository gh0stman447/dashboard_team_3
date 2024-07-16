export const recalculateImprovement = (data) => {
  return data.map((item) => ({
    ...item,
    improvement: item.improvement - item.empLvl
  }));
};
