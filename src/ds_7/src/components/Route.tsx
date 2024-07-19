import React from 'react';
import { UrlState } from 'bi-internal/core';
import { useLocationChange } from './hooks/useLocationChange';

export const Route = ({ pageName, children }: any) => {
  // useLocationChange();

  const stateCharts = UrlState.getModel();

  const { dboard } = stateCharts;

  if (!pageName.length && (dboard === '1' || !dboard)) {
    return <>{children}</>;
  }

  return dboard && pageName.includes(dboard) ? <>{children} </> : null;
};
