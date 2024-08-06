import React from 'react';
import { UrlState } from 'bi-internal/core';

export const Route = ({ pageName, children }: any) => {
  const stateCharts = UrlState.getModel();

  const { dboard } = stateCharts;

  if (!pageName.length && (dboard === '1' || !dboard)) {
    return <>{children}</>;
  }

  return dboard && pageName.includes(dboard) ? <>{children} </> : null;
};