interface PieData {
  name: string;
  value: number;
  color: string;
}

export const calculateDifferenceForPie = (arr1: PieData[], arr2: PieData[], hasDateFilter: boolean) => {
  if (!hasDateFilter) {
    return arr1?.map((el) => ({
      ...el,
      difference: null
    }));
  }
  const map2 = arr2.reduce((acc, el) => {
    acc[el.name] = el.value;
    return acc;
  }, {});

  return arr1?.map((el) => {
    const diff = el.value - (map2[el.name] || 0);
    return {
      ...el,
      difference: diff
    };
  });
};
