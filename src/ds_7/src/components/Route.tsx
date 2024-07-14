import React from 'react';
import { UrlState } from 'bi-internal/core';

export const Route = ({ pageName = [], children }: { pageName: string[]; children: React.ReactNode }) => {
  const stateCharts = UrlState.getModel();
  console.log(stateCharts, 'stateCharts');
  const { dash } = stateCharts;
  if (!pageName.length && (dash === '1' || !dash)) return <>{children}</>;
  return dash && pageName.includes(dash) ? <>{children}</> : null;
};
