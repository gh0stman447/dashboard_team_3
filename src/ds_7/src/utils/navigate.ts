import { UrlState } from 'bi-internal/core';

export const navigateToDboard = (dboard: string) => {
  UrlState.navigate({ dboard });
};
